import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { AuthenticationService } from '../protection/_services/auth.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

    function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
        const passwordControl = c.get('password');
        const confirmControl = c.get('confirmPassword');
        if (passwordControl.pristine || confirmControl.pristine) {
            return null;
        }
        if (passwordControl.value === confirmControl.value) {
            return null;
        }
        return { 'match': true };
    }

@Component({
    selector: 'vn-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    registrationForm: FormGroup;

    emailMessage: string;

    msgs: Message[] = [];

    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private fb: FormBuilder, private authservice: AuthenticationService) { }

    ngOnInit() {
        this.formInit();
    }

    formInit() {
        this.registrationForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(3)]],
            lastname: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            passwordGroup: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
            }, {validator: passwordMatcher}),
            orgname: ['', Validators.required],
            addressGroup: this.fb.group({
                addst: ['', Validators.required],
                addbrgy: ['', Validators.required],
                addcity: ['', Validators.required],
                addregion: ['', Validators.required]
            }),
            full_add: ['', [Validators.required, Validators.minLength(6)]]
        });
        const emailControl = this.registrationForm.get('email');
        emailControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(emailControl));
    }

    save(): void {
        let formValue: any = [];
        formValue = this.registrationForm.value;
        const newVAdmin = {
            email : formValue.email,
            password : formValue.passwordGroup.confirmPassword,
            utype : 'venue_admin',
            firstname : formValue.firstname,
            lastname : formValue.lastname,
            orgname : formValue.orgname,
            addst : formValue.addressGroup.addst,
            addbrgy : formValue.addressGroup.addbrgy,
            addcity : formValue.addressGroup.addcity,
            addregion : formValue.addressGroup.addregion,
            full_add : formValue.full_add
        };
        this.authservice.registerNewAdmin(newVAdmin)
            .then((result) => {
                this.showSuccess('Registration Successful!');
                this.formInit();
            }, (err) => {
                this.showError('Please review the entered details first');
            });
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
        }
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess(msg) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Registration', detail: msg});
    }

}
