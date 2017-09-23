import { ServerConfig } from '../../../data/config';
import { Component, OnInit, Input } from '@angular/core';
import { OrgService } from '../../../data/org.service';
import { VenueService } from '../../../data/venue.service';
import { Message, GrowlModule } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'vn-venue-list',
    templateUrl: './venue-list.component.html',
    styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {

    @Input() getMode: String = 'All';

    public venues: any = [];

    msgs: Message[] = [];

    constructor( private _orgService: OrgService, private router: Router,
                 private _vService: VenueService, private route: ActivatedRoute,
                private sConfig: ServerConfig ) { }

    ngOnInit() {
        this.getMyVenues();
    }

    buildVenueThumb(img) {
        return this.sConfig.serverUrl + 'images/venuethumbnail/' + img;
    }

    getMyVenues() {
        if (this.getMode === 'All') {
            this._orgService.getMyVenues()
            .then((result) => {
                this.venues = result;
            }, (err) => {
                this.showError('Cannot get your Place\'s Venues');
            });
        } else {
            this._vService.getMyVenuesExceptOne(this.getMode)
            .then((result) => {
                this.venues = result;
            }, (err) => {
                this.showError('Cannot get your Place\'s Venues');
            });
        }

    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    goToVenueDetail(id) {
        this.router.navigate(['dashboard', 'venues', 'details', id]);
    }

    viewAdd() {
        this.router.navigate(['./', 'add'], { relativeTo: this.route });
    }
}
