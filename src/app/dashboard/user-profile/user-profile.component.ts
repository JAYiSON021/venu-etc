import { Component, OnInit } from '@angular/core';
import { VAdminService } from '../../data/vadmin.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

    function isDateValid(): ValidatorFn {
        return  (c: AbstractControl): {[key: string]: boolean} | null => {
            if (c.pristine) {
                return null;
            }
            if (c.value === 'U') {
                return {'notdate' : true};
            }
            return null;
        };
    }

@Component({
    selector: 'vn-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    userProfileForm: FormGroup;

    msgs: Message[] = [];

    public vadminData: any = [];

    constructor(private vadminService: VAdminService, private fb: FormBuilder) { }

    ngOnInit() {
        this.formInit();
    }

    formInit() {
        this.getVAdminInfo();
        this.userProfileForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(3)]],
            lastname: ['', [Validators.required, Validators.minLength(3)]],
            addressGroup: this.fb.group({
                addst: ['', Validators.required],
                addbrgy: ['', Validators.required],
                addcity: ['', Validators.required],
                addregion: ['', Validators.required]
            }),
            gender: ['', Validators.required],
            birthdayGroup: this.fb.group({
                month: ['', [Validators.required, isDateValid()]],
                day: ['', [Validators.required, isDateValid()]],
                year: ['', [Validators.required, isDateValid()]],
                age: {value: '', disabled: true },
            }),
            number: ['', Validators.required]
        });
    }

    populateAdminData() {
        this.userProfileForm.patchValue({
            firstname: this.vadminData.firstname,
            lastname: this.vadminData.lastname,
            addressGroup: {
                addst: this.vadminData.address.st,
                addbrgy: this.vadminData.address.brgy,
                addcity: this.vadminData.address.city,
                addregion: this.vadminData.address.region
            },
            gender: this.vadminData.gender,
            birthdayGroup: {
                month: this.vadminData.birthday.month,
                day: this.vadminData.birthday.day,
                year: this.vadminData.birthday.year,
                age: this.vadminData.age,
            },
            number: this.vadminData.number
        });
    }

    getVAdminInfo() {
        this.vadminService.getVAdminInfo()
        .then((result) => {
            this.vadminData = result;
            this.populateAdminData();
        }, (err) => {
            this.showError('Cannot get the Admin\'s Info');
        });
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess(successmsg) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: successmsg});
    }

    save() {
        let formValue: any = [];
        formValue = this.userProfileForm.value;
        const updatedAdminInfo = {
            firstname: formValue.firstname,
            lastname: formValue.lastname,
            addst: formValue.addressGroup.addst,
            addbrgy: formValue.addressGroup.addbrgy,
            addcity: formValue.addressGroup.addcity,
            addregion: formValue.addressGroup.addregion,
            gender: formValue.gender,
            bday: formValue.birthdayGroup.day,
            bmonth: formValue.birthdayGroup.month,
            byear: formValue.birthdayGroup.year,
            number: formValue.number
        };
        this.vadminService.updateVAdminInfo(updatedAdminInfo)
        .then((result) => {
            let msg: any = [];
            msg = result;
            this.showSuccess(msg.message);
            this.formInit();
        }, (err) => {
            this.showError('Cannot update the Admin\'s Info');
        });
    }
}
