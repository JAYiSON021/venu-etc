import { ServerConfig } from '../../data/config';
import { VenueService } from '../../data/venue.service';
import { LookerService } from '../../data/looker.service';
import { PaymentInfoService } from '../../data/payment_info.service';
import { PaymentReqService } from '../../data/payment_req.service';
import { MenuItem } from 'primeng/primeng';
import { EventService } from '../../data/events.service';
import { OrgService } from '../../data/org.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';

@Component({
    selector: 'vn-sched',
    templateUrl: './sched.component.html',
    styles: []
})
export class SchedComponent implements OnInit {

    public _myVenues: any = [];

    venueOpts: SelectItem[];

    events: any[];

    selectedVenue: String = 'master';

    public _selectedVenueEvents: any = {};

    public _selectedVenueEventsMaster: any = {};

    headerConfig: any;

    selectedEventData: any;

    items: MenuItem[];

    viewDetails: Boolean = false;

    viewPayments: Boolean = false;

    loadingPayments: Boolean = false;

    loadingDetails: Boolean = false;

    selectedEventDetails: any = {};

    selectedEventPrs: any = {};

    public PaymentInfoList: any = [];

    selectedPaymentEvent: String = '';

    public selectedLookerDetails: any = {};

    public selectedVenueDetails: any = {};

    paymentRefHostUrl: String = this.sConfig.serverUrl + 'images/payment_reference/';

    lookerHostUrl: String = this.sConfig.serverUrl + 'images/looker/';

    venueHostUrl: String = this.sConfig.serverUrl + 'images/venuethumbnail/';

    constructor(private _orgService: OrgService,
                private _eventService: EventService,
                private _prService: PaymentReqService,
                private _piService: PaymentInfoService,
                private _lookerService: LookerService,
                private _venueService: VenueService,
                private sConfig: ServerConfig) { }

    ngOnInit() {
        this._getMyVenues();
        this.schedInit();
        this.items = [
            {label: 'View Details', command: (event) => this.onViewdetails(this.selectedEventData)},
            {label: 'View Payments', command: (event) => this.onViewPayments(this.selectedEventData)},
            {label: 'Cancel Event', command: (event) => this.onRowSelect(this.selectedEventData)}
        ];
    }

    onRowSelect(ev) {
        console.log(ev);
    }

    onViewdetails(ev) {
        this.viewDetails = true;
        this.selectedEventDetails = ev;
        this._handleDetails(ev.looker, ev.venue);
    }

    _handleDetails(looker, venue) {
        this.loadingDetails = true;
        setTimeout(() => {
            this._lookerService.getLookerById(looker)
            .then(data => {
                this.selectedLookerDetails = data;

                this._venueService.getVenueById(venue)
                .then(datam => {
                    this.selectedVenueDetails = datam;
                    this.loadingDetails = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loadingDetails = false;
                });

            })
            .catch(err => {
                console.log(err);
                this.loadingDetails = false;
            });
        }, 500);
    }

    buildLookerImgSrc(img): string {
        return this.lookerHostUrl + img;
    }

    buildVenueImgSrc(img): string {
        return this.venueHostUrl + img;
    }

    onViewPayments(ev) {
        this.viewPayments = true;
        this.selectedPaymentEvent = ev.event_title;
        this._getPRs(ev._id);
    }

    buildRefImgSrc(img): string {
        return this.paymentRefHostUrl + img;
    }

    _getPRs(id) {
        this.loadingPayments = true;
        setTimeout(() => {
            this._prService.getPRs(id)
            .then(data => {
                this.selectedEventPrs = data;
                if (this.selectedEventPrs.payment_reqs.length > 0) {
                    this._piService.getPaymentInfoByResreqId(id)
                    .then(datam => {
                        this.PaymentInfoList = datam;
                        this.loadingPayments = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.loadingPayments = false;
                    });
                } else {
                    this.loadingPayments = false;
                }
            })
            .catch(err => {this.loadingPayments = false; console.log(err); });
        }, 500);
    }

    _getMyVenues(): void {
        this._orgService.getMyVenuesSchedList()
            .then(data => {
                this._myVenues = data;
                this.venueOptsInit();
            })
            .catch(err => { console.log(err); });
    }

    venueOptsInit(): void {
        this.venueOpts = [];
        this.venueOpts.push({label: 'Master Schedule', value: 'master'});
        this._myVenues.forEach(venue => {
            this.venueOpts.push({label: venue.name, value: venue._id});
        });
        this._getEventsMasterList();
    }

    _getVenueEventsList(ev): void {
        this.selectedVenue === 'master' ? ( this._getEventsMasterList()) : (this._getEventsByVenue(ev.value));
    }

    _getEventsByVenue(id): void {
        this._eventService.getMyVenueEventsById(id)
        .then(data => {
            this._selectedVenueEvents = data;
            this._pushEventsFromVenueSched('venue');
        })
        .catch(err => { console.log(err); });
    }

    _getEventsMasterList(): void {
        this._eventService.getMyVenueEventsMaster()
        .then(data => {
            this._selectedVenueEventsMaster = data;
            this._pushEventsFromVenueSched('master');
        })
        .catch(err => { console.log(err); });
    }

    _pushEventsFromVenueSched(mode: string): void {
        this.events = [];
        let selectedMode: any = {};
        switch (mode) {
            case 'venue':
                selectedMode = this._selectedVenueEvents;
            break;
            case 'master':
                selectedMode = this._selectedVenueEventsMaster;
            break;
        };
        selectedMode.venue_scheds.forEach(venue_event => {
            if (venue_event.event_date_type === 'Multiple Dates Event') {
                venue_event.event_date_time.forEach(e_date_time => {
                    this.events.push(
                        {
                            'title': venue_event.event_title,
                            'start': e_date_time.event_date + 'T' + e_date_time.event_time_from,
                            'end': e_date_time.event_date + 'T' + e_date_time.event_time_to,
                            'color': '#fff',
                            'backgroundColor': '#444444'
                        }
                    );
                });
            } else {
                venue_event.event_date_time.forEach(e_date_time => {
                    this.events.push(
                        {
                            'title': venue_event.event_title,
                            'start': e_date_time.event_date + 'T' + e_date_time.event_time_from,
                            'end': e_date_time.event_date + 'T' + e_date_time.event_time_to
                        }
                    );
                });
            }
        });
    }

    schedInit(): void {
        this.events = [];
        this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        };
    }

}
