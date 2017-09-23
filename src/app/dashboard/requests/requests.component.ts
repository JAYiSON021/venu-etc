import { ServerConfig } from '../../data/config';
import { Router } from '@angular/router';
import { window } from 'rxjs/operator/window';
import { PaymentInfoService } from '../../data/payment_info.service';
import { NotifService } from '../../data/notif.service';
import { ConfirmationService } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { PaymentReqService } from '../../data/payment_req.service';
import { LookerService } from '../../data/looker.service';
import { SelectItem } from 'primeng/primeng';
import { ReservationReqService } from '../../data/reservation_req.service';
import { VenueService } from '../../data/venue.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Message } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';

@Component({
    selector: 'vn-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css'],
    providers: [ConfirmationService]
})
export class RequestsComponent implements OnInit {

    public reservationReq: any = {};

    public selectedReservationReq: any = {};

    public selectedReservationReqEdateTime = [];

    public selectedVenue: any = {};

    public selectedLooker: any = {};

    public selectedReservationReqPRs: any = {};

    public lookerImgHost: String = this.sConfig.serverUrl + 'images/looker/';

    public venueImgHost: String = this.sConfig.serverUrl + 'images/venuethumbnail/';

    public pinfoReferenceImgHost: String = this.sConfig.serverUrl + 'images/payment_reference/';

    public prInfo = {
        amount: 0,
        inclusions: '',
        payment_opts: '',
    };

    displayPR: Boolean = false;

    msgs: Message[] = [];

    reserveOpts: SelectItem[];

    items: MenuItem[];

    displayPaymentInfo: Boolean = false;

    displayConfirmApprove: Boolean = false;

    displayRejectDialog: Boolean = false;

    paymentInfo: any = {};

    rejectionMessage: String = '';

    constructor(private reservation_req: ReservationReqService,
                private v_service: VenueService,
                private l_service: LookerService,
                private pr_service: PaymentReqService,
                private confirmationService: ConfirmationService,
                private notifService: NotifService,
                private pinfoService: PaymentInfoService,
                private zone: NgZone,
                private router: Router,
                private sConfig: ServerConfig) { }

    ngOnInit() {
        this.getReservationReq();
        this.itemsInit();
    }

    confirmPmtRequestDeletion(prid): void {
        this.confirmationService.confirm({
            message: 'Do you want to delete this payment request?',
            header: 'Delete Confirmation',
            accept: () => {
                this.delPaymentRequest(prid);
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'Deletion cancelled'}];
            }
        });
    }

    refreshPrInfo() {
        this.prInfo = {
            amount: 0,
            inclusions: '',
            payment_opts: '',
        };
    }

    itemsInit(): void {
        this.items = [
            {label: 'Edit Pmnt. Req.', icon: 'ui-icon-edit', command: () => {

            }}
        ];
    }

    showPRDialog(): void {
        this.displayPR = true;
    }

    getReservationReq() {
        this.reservation_req.getReservationReq()
        .then((result) => {
            this.reservationReq = result;
            this.fetchReserveOpts();
        }, (err) => {
            this.showError('Cannot get the Admin\'s Info');
        });
    }

    fetchReserveOpts() {
        this.reserveOpts = [];
        if (this.reservationReq.count) {
            this.reservationReq.reservations_request_list.forEach(element => {
                this.reserveOpts.push({label: element.event_title, value: element._id});
            });
        }
    }

    getReservationDetails(id): void {
        this.reservation_req.getReservationById(id)
        .then((result) => {
            this.selectedReservationReqEdateTime = [];
            this.selectedReservationReq = result;
            this.selectedReservationReq.event_date_time.forEach((edates) => {
                this.selectedReservationReqEdateTime.push(edates.event_date);
            });
            console.log(this.selectedReservationReqEdateTime);
            this.getVenueDetails(this.selectedReservationReq.venue);
            this.getLookerDetails(this.selectedReservationReq.looker);
            this.getSentPr(this.selectedReservationReq._id);
        }, (err) => {
            this.showError('Unable to fetch Reservation INFO');
        });
    }

    getVenueDetails(id): void {
        this.v_service.getVenueById(id)
        .then((result) => {
            this.selectedVenue = result;
        }, (err) => {
            this.showError('Unable to fetch Venue INFO');
        });
    }

    getLookerDetails(id): void {
        this.l_service.getLookerById(id)
        .then((result) => {
            this.selectedLooker = result;
        }, (err) => {
            this.showError('Unable to fetch Looker INFO');
        });
    }

    getSentPr(id): void {
        this.pr_service.getPRs(id)
        .then((result) => {
            this.selectedReservationReqPRs = result;
        }, (err) => {
            this.showError('Unable to fetch payment requests INFO');
        });
    }

    delPaymentRequest(prid): void {
        const delPR = {
            reservation_req: this.selectedReservationReq._id,
            payment_req: prid
        };
        this.pr_service.deletePR(delPR)
        .then((result) => {
            this.showInfo('Payment Request Deleted');
        }, (err) => {
            this.showError('Unable to delete payment requests');
        });
        this.refreshAfterPRSent();
        this.refreshPrInfo();
    }

    submitPr(): void {
        this.displayPR = false;
        const newPR = {
            req_id: this.selectedReservationReq._id,
            amount: this.prInfo.amount,
            inclusions: this.prInfo.inclusions,
            payment_opts: this.prInfo.payment_opts,
            notif_reciever: this.selectedLooker._id
        };
        this.pr_service.submitPR(newPR)
        .then((result) => {
            this.showSuccess('Payment Request Sent');
        }, (err) => {
            this.showError('Unable to send payment requests');
        });
        this.refreshAfterPRSent();
        this.refreshPrInfo();
    }

    refreshAfterPRSent(): void {
        this.getReservationReq();
        this.getReservationDetails(this.selectedReservationReq._id);
    }

    onReservationSelectChange(event) {
        this.getReservationDetails(event.value);
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess(scc) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: scc});
    }

    showInfo(info) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info', detail: info});
    }

    getPaymentInfo(id): void {
        this.displayPaymentInfo = true;
        this.pinfoService.getPaymentInfoById(id)
            .then(data => {
                this.paymentInfo = data;
            })
            .catch(err => { console.log(err)});
    }

    assemBleImg(img) {
        return this.pinfoReferenceImgHost + img;
    }

    approveReservatioRequest(id): void {
        const reqBody = {
            edates: this.selectedReservationReqEdateTime,
            id: id,
            notif_reciever: this.selectedLooker._id
        };
        this.reservation_req.doApproveRequest(reqBody)
            .then(data => {
                let ddata: any = {}
                ddata = data;
                this.showSuccess(ddata.message);
            })
            .catch(err => {
                this.showError(err);
            });
        this.displayConfirmApprove = false;
        this.refreshAfterPRSent();
        this.refreshPrInfo();
        setTimeout(() => {
            this.zone.runOutsideAngular(() => {
                location.reload();
            });
        }, 500);

    }

    rejectReservationRequest(id): void {
        const reqBody = { id: id, reason: this.rejectionMessage, notif_reciever: this.selectedLooker._id };
        this.reservation_req.doRejectRequest(reqBody)
            .then(res => {
                let ddata: any = {}
                ddata = res;
                this.showSuccess(ddata.message);
            })
            .catch(err => {
                this.showError(err);
            });
        this.displayRejectDialog = false;
        this.refreshAfterPRSent();
        this.refreshPrInfo();
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 500);
    }

}
