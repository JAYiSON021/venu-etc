import { ServerConfig } from '../../../data/config';
import { UploadService } from '../../../data/upload.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { VenueService } from '../../../data/venue.service';
import { Message, GrowlModule } from 'primeng/primeng';

@Component({
    selector: 'vn-venue-detail',
    templateUrl: './venue-detail.component.html',
    styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit, OnDestroy {

    paramSubscription: Subscription;

    public id: String = '';

    public venue: any = [];

    public costs: any = [];

    public av: any = [];

    msgs: Message[] = [];

    venueOverview: String = '';

    displayCP =  false;

    displayGallUp =  false;

    filesToUpload: Array<File> = [];

    photo: any;

    photoGall: any;

    displayDeleteDialog: Boolean = false;

    venueThumbnail: String = '';

    constructor( private route: ActivatedRoute, private venueService: VenueService,
                 private router: Router, private uploadService: UploadService,
                private sConfig: ServerConfig ) { }

    ngOnInit() {
        this.venueInit();
    }

    venueInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.paramSubscription = this.route.params
        .subscribe( (params: Params) => {
            this.id = params['id'];
            this.getVenueById(this.id);
        });
        this.getVenueById(this.id);
    }

    getVenueById(id: String) {
        this.venueService.getVenueById(id)
        .then((result) => {
            let res: any = [];
            res = result;
            if (res.name === 'CastError') {
                this.router.navigate(['dashboard', 'venues']);
            } else {
                this.venue = result;
                this.costs = this.venue.costs;
                this.av = this.venue.availability;
                this.venueOverview = this.venue.overview;
                if (this.venue.img_url === 'default') {
                    this.venueThumbnail = 'assets/layout/images/dark-user-bg.png';
                } else {
                    this.venueThumbnail = this.sConfig.serverUrl + 'images/venuethumbnail/' + this.venue.img_url;
                }
            }
        }, (err) => {
            this.router.navigate(['dashboard', 'venues']);
        });
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showInfo(info) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info', detail: info});
    }

    showWarn(Warning) {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: 'Warning', detail: Warning});
    }

    showSuccess(successmsg) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: successmsg});
    }

    onNavigateNew() {
        this.router.navigate(['../', 'new'], {relativeTo: this.route});
    }

    onNavigateList() {
        this.router.navigate(['../../', 'do', 'list'], {relativeTo: this.route});
    }

    onNavigateEdit() {
        this.router.navigate(['../../', 'edit', this.id], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.paramSubscription.unsubscribe();
    }

    deleteVenue(venue) {
        this.displayDeleteDialog = false;
        this.venueService.deleteVenueById(venue)
        .then((result) => {
            this.showSuccess('Venue Successfuly Removed!');
            this.onNavigateList();
        }, (err) => {
            this.showError('Cannot Delete this Venue');
        });
    }

    disableVenue() {
        this.venueService.disableVenueById(this.venue._id)
        .then((result) => {
            this.showWarn('Venue Disabled');
            this.venueInit();
        }, (err) => {
            console.log(err);
            this.showError('Cannot Delete this Venue');
        });
    }

    enableVenue() {
        this.venueService.enableVenueById(this.venue._id)
        .then((result) => {
            this.showInfo('Venue Enabled');
            this.venueInit();
        }, (err) => {
            console.log(err);
            this.showError('Cannot Delete this Venue');
        });
    }

    enableDisable(enabled) {
        if (this.venue) {
            if (enabled === true) {
                this.enableVenue();
            } else if (enabled === false) {
                this.disableVenue();
            } else {
                this.showError('Cannot perform this process');
            }
        }
    }

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        formData.append('photo', files[0], files[0]['name']);
        this.uploadService.uploadVenuePic(formData, this.id)
        .then((result) => {
            this.displayCP = false;
            this.showSuccess('Uploaded Successfully!');
            this.photo = '';
            this.venueInit();
        }, (err) => {
            this.showError('Cannot upload photo');
        });
    }

    uploadGall() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        formData.append('photo', files[0], files[0]['name']);
        this.uploadService.uploadVenueGall(formData, this.id)
        .then((result) => {
            this.displayGallUp = false;
            this.showSuccess('Uploaded Successfully!');
            this.photo = '';
            this.venueInit();
        }, (err) => {
            this.showError('Cannot upload photo');
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.photo = fileInput.target.files[0]['name'];
    }

    fileChangeEventGall(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.photoGall = fileInput.target.files[0]['name'];
    }

    assemBlegallImgUrl(img) {
        return this.sConfig.serverUrl + 'images/venuegallery/' + img;
    }
}
