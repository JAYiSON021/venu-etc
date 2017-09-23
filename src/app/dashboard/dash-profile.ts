import { ServerConfig } from '../data/config';
import { UploadService } from '../data/upload.service';
import { Component, Input, OnInit, EventEmitter,
         ViewChild, trigger, state, transition, style,
         animate, Inject, forwardRef
       } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationService } from '../protection/_services/auth.service';
import { VAdminService } from '../data/vadmin.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
    selector: 'vn-inline-profile',
    templateUrl: './dash-profile.html',
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})

export class DashProfileComponent implements OnInit {

    vadminData: any = [];

    active: Boolean;

    msgs: Message[] = [];

    vadminPhoto = '';

    display = false;

    displayCP =  false;

    filesToUpload: Array<File> = [];

    photo: any;

    constructor(private authService: AuthenticationService, 
        private sConfig: ServerConfig, private vadminService: VAdminService, private uploadService: UploadService) {}

    ngOnInit() {
        this.getVAdminInfo();
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }

    logout() {
        this.authService.logout();
    }

    getVAdminInfo() {
        this.vadminService.getVAdminInfo()
        .then((result) => {
            this.vadminData = result;
            this.vadminPhoto = this.sConfig.serverUrl + 'images/vadmin/' + this.vadminData.img_url;
        }, (err) => {
            this.showError('Cannot get the Admin\'s Info');
        });
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess(succ) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: succ});
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.photo = fileInput.target.files[0]['name'];
    }

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        formData.append('photo', files[0], files[0]['name']);
        this.uploadService.uploadVadminPic(formData)
        .then((result) => {
            this.displayCP = false;
            this.showSuccess('Uploaded Successfully!');
            this.getVAdminInfo();
            this.photo = '';
        }, (err) => {
            this.showError('Cannot upload photo');
        });
    }

}
