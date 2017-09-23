import { ServerConfig } from '../../data/config';
import { UploadService } from '../../data/upload.service';
import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../data/org.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
    selector: 'vn-org-details',
    templateUrl: './org-details.component.html',
    styleUrls: ['./org-details.component.css']
})
export class OrgDetailsComponent implements OnInit {

    orgProfileForm: FormGroup;

    msgs: Message[] = [];

    orgData: any = [];

    emailMessage: string;

    orgThumbnail: String = '';

    displayCP: Boolean = false;

    displayCL: Boolean = false;

    filesToUpload: Array<File> = [];

    photo: any;

    public validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private _orgService: OrgService, 
                private fb: FormBuilder, 
                private uploadService: UploadService,
                private sConfig: ServerConfig) { }

    ngOnInit() {
        this.formInit();
    }

    formInit() {
        this.getOrgInfo();
        this.orgProfileForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6) ]],
            full_add: ['', [Validators.required, Validators.minLength(6) ]],
            addressGroup: this.fb.group({
                addst: ['', [ Validators.required ]],
                addbrgy: ['', [ Validators.required ]],
                addcity: ['', [ Validators.required ]],
                addregion: ['', [ Validators.required ]]
            }),
            landmark: '',
            enabled: { value: false, disabled: true },
            verified: { value: false, disabled: true },
            geoGroup: this.fb.group({
                lat: { value: '' },
                long: { value: '' }
            }),
            org_email: ['', [ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+') ]],
            overview: ['', [ Validators.required, Validators.minLength(100), Validators.maxLength(500) ]]
        });
        const emailControl = this.orgProfileForm.get('org_email');
        emailControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(emailControl));
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
        }
    }

    populateOrgData() {
        this.orgProfileForm.patchValue({
            name: this.orgData.name,
            full_add: this.orgData.full_add,
            addressGroup: {
                addst: this.orgData.address.st,
                addbrgy: this.orgData.address.brgy,
                addcity: this.orgData.address.city,
                addregion: this.orgData.address.region
            },
            landmark: this.orgData.landmark,
            enabled: this.orgData.enabled,
            verified: this.orgData.verified,
            geoGroup: {
                lat: this.orgData.geo.lat,
                long: this.orgData.geo.long
            },
            org_email: this.orgData.org_email,
            overview: this.orgData.overview
        });
    }

    getOrgInfo() {
        this._orgService.getOrgInfo()
        .then(result => {
            this.orgData = result;
            if (this.orgData.img_url === 'default') {
                this.orgThumbnail = 'assets/layout/images/dark-user-bg.png';
            } else {
                this.orgThumbnail = this.sConfig.serverUrl + 'images/orgthumbnail/' + this.orgData.img_url;
            }
            this.populateOrgData();
        }, (err) => {
            this.showError('Cannot get the Org\'s Info');
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
        formValue = this.orgProfileForm.value;
        const updatedOrgInfo = {
            name: formValue.name,
            full_add: formValue.full_add,
            addst: formValue.addressGroup.addst,
            addbrgy: formValue.addressGroup.addbrgy,
            addcity: formValue.addressGroup.addcity,
            addregion: formValue.addressGroup.addregion,
            landmark: formValue.landmark,
            org_email: formValue.org_email,
            overview: formValue.overview
        };
        this._orgService.updateOrgInfo(updatedOrgInfo)
        .then((result) => {
            let msg: any = [];
            msg = result;
            this.showSuccess(msg.message);
            this.formInit();
        }, (err) => {
            this.showError('Cannot update the Admin\'s Info');
        });
    }

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        formData.append('photo', files[0], files[0]['name']);
        this.uploadService.uploadOrgPic(formData)
        .then((result) => {
            this.displayCP = false;
            this.showSuccess('Uploaded Successfully!');
            this.photo = '';
            this.formInit();
        }, (err) => {
            this.showError('Cannot upload photo');
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.photo = fileInput.target.files[0]['name'];
    }

    getLatLong() {
        this.uploadService.getLatLong(this.orgData.full_add)
        .then((result) => {
            const res = result;
            this.displayCL = false;
            this.orgProfileForm.patchValue({
                full_add: this.orgData.full_add,
                geoGroup: {
                    lat: res.results[0].geometry.location.lat,
                    long: res.results[0].geometry.location.lng
                }
            });
            this.updateOrgLocInfo();
        }, (err) => {
            this.showError('Cannot set Location');
        });
    }

    updateOrgLocInfo() {
        let formValue: any = [];
        formValue = this.orgProfileForm.value;
        const updatedOrgLocInfo = {
            lat: formValue.geoGroup.lat,
            long: formValue.geoGroup.long,
            full_add: formValue.full_add
        };
        this._orgService.updateOrgLocInfo(updatedOrgLocInfo)
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
