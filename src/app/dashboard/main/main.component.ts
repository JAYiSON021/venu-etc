import { PaymentInfoService } from '../../data/payment_info.service';
import { ReservationReqService } from '../../data/reservation_req.service';
import { TaskService } from '../../data/tasks.service';
import { EventService } from '../../data/events.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { OrgService } from '../../data/org.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
    selector: 'vn-main',
    templateUrl: './main.component.html',
    styles: []
})
export class MainComponent implements OnInit {

    items: MenuItem[];

    orgData: any = [];

    msgs: Message[] = [];

    events: any[];

    headerConfig: any;

    taskDataLoaded = false;

    taskDone = 0;

    taskUnDone = 0;

    public _selectedVenueEventsMaster: any = {};

    public _todayEventsMaster: any = {};

    public allPinfo: any;

    taskData = {};

    public totalPayment = 0;

    public reservationReq: any = {};

    constructor(private _orgService: OrgService,
                private _eventService: EventService,
                private _taskService: TaskService,
                private reservation_req: ReservationReqService,
                private _pinfoService: PaymentInfoService) { }

    ngOnInit() {
        this.items = [
            {label: 'Angular.io', icon: 'ui-icon-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'ui-icon-brush', routerLink: ['/theming']}
        ];
        this.getOrgInfo();
        this.schedInit();
        this._getEventsMasterList();
        this._getCounts();
        this.getReservationReq();
        this._getTodayEventsMasterList();
        this.getPaymentInfoByOrg();
    }

    getReservationReq() {
        this.reservation_req.getReservationReq()
        .then((result) => {
            this.reservationReq = result;
        }, (err) => {
            this.showError('Cannot get the Admin\'s Info');
        });
    }

    _getCounts() {
        this._taskService.getCountDone()
            .then(data => {
                const countDone = data.count;
                this.taskDone = countDone;
                this._taskService.getCountUnDone()
                .then(datam => {
                    const countUnDone = datam.count;
                    this.taskUnDone = countUnDone;
                    this.taskDataInit(countDone, countUnDone);
                })
                .catch(err => {
                    this._errCatcher(err);
                });

            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    getPaymentInfoByOrg() {
        this._pinfoService.getPaymentInfoByOrg()
            .then(data => {
                this.allPinfo = data;
                this.totalPayment = 0;
                this.allPinfo.pinfos.forEach((data) => {
                    this.totalPayment += data.amount;
                });
                console.log(JSON.stringify(this.allPinfo));
                console.log(JSON.stringify(this.totalPayment));
            })
            .catch(err => {
                console.log(err);
            });
    }

    _errCatcher(err): void {
        this.showError(err);
    }

    taskDataInit(fin, unfin): void {
        this.taskData = {
            labels: ['Finished Tasks', 'Unfinished tasks'],
            datasets: [
                {
                    data: [fin, unfin],
                    backgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ]
                }]
            };
        this.taskDataLoaded = true;
    }

    _getEventsMasterList(): void {
        this._eventService.getMyVenueEventsMaster()
        .then(data => {
            this._selectedVenueEventsMaster = data;
            this._pushEventsFromVenueSched();
        })
        .catch(err => { console.log(err); });
    }

    _getTodayEventsMasterList(): void {
        this._eventService.getTodayEventsMaster()
        .then(data => {
            this._todayEventsMaster = data;
            console.log(JSON.stringify(this._todayEventsMaster));
        })
        .catch(err => { console.log(err); });
    }

    schedInit(): void {
        this.events = [];
        this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: ''
        };
    }

    _pushEventsFromVenueSched(): void {
        this.events = [];
        const selectedMode = this._selectedVenueEventsMaster;
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

    getOrgInfo() {
        this._orgService.getOrgInfo()
        .then(result => {
            this.orgData = result;
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

}
