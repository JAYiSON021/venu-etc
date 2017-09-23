import { ServerConfig } from '../data/config';
import { PaymentInfoService } from '../data/payment_info.service';
import { NotifService } from '../data/notif.service';
import { ReservationReqService } from '../data/reservation_req.service';
import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationService } from '../protection/_services/auth.service';
import { VAdminService } from '../data/vadmin.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
    selector: 'vn-topbar',
    templateUrl: './dash-topbar.html'
})

export class DashTopbarComponent implements OnInit {

    public vadminData: any = [];

    public reservationReq: any = {};

    public notifs: any = {};

    public notifCounter: Number = 0;

    msgs: Message[] = [];

    n_count = 0;

    public notifBody: any = {};

    display = false;

    displayNotifBody_viewpay = false;

    displayNotifBody_cancelled = false;

    public payment_info = {};

    public payment_info_loaded = false;


    constructor(@Inject(forwardRef(() => DashboardComponent)) public app: DashboardComponent,
    private vadminService: VAdminService,
    private authService: AuthenticationService,
    private reservation_req: ReservationReqService,
    private notifService: NotifService,
    private pinfoService: PaymentInfoService,
    private router: Router,
    private sConfig: ServerConfig) {}

    ngOnInit() {
        this.getVAdminInfo();
        this.getReservationReq();
        this.getOrgNotif();
        this.getOrgNotifCount();
    }

    buildVadminImg(img) {
        return this.sConfig.serverUrl + 'images/looker/' + img;
    }

    refreshNotif(): void {
        this.getOrgNotif();
        this.getOrgNotifCount();
    }

    getVAdminInfo() {
        this.vadminService.getVAdminInfo()
        .then((result) => {
            this.vadminData = result;
        }, (err) => {
            this.showError('Cannot get the Admin\'s Info');
        });
    }

    getReservationReq() {
        this.reservation_req.getReservationReq()
        .then((result) => {
            this.reservationReq = result;
        }, (err) => {
            this.showError('Cannot get the Admin\'s Info');
        });
    }

    getOrgNotif() {
        this.notifService.getOrgNotifs()
        .then((result) => {
            this.notifs = result;
        }, (err) => {
            this.showError('Cannot get the Notifications');
        });
    }

    getOrgNotifCount() {
        this.notifService.getOrgNotifsCount()
        .then((result) => {
            this.n_count = Number(result);
        }, (err) => {
            this.showError('Cannot get the Notifications');
        });
    }

    logout() {
        this.authService.logout();
    }

    assignNotifBody(mode, l_notifBody) {
        switch (mode) {
            case 'new_payment_info':
                this.viewNotifBody_viewpay(l_notifBody);
            break;
            case 'cancelled_reservation':
                this.viewNotifBody_cancelled(l_notifBody);
            break;
        }
        console.log(mode);
    }

    viewNotifBody_cancelled(l_notifBody): void {
        console.log(l_notifBody);
        this.notifBody = l_notifBody;
        this.displayNotifBody_cancelled = true;
    }

    viewNotifBody_viewpay(l_notifBody): void {
        this.payment_info_loaded = false;
        console.log(l_notifBody);
        this.notifBody = l_notifBody;
        this.displayNotifBody_viewpay = true;
        this.getPaymentInfo(l_notifBody.notif_body.index_pointer);
    }

    onNavigateToResReq() {
        this.router.navigate(['dashboard', 'req']);
        this.displayNotifBody_viewpay = false;
    }

    private getPaymentInfo(id) {
        this.pinfoService.getPaymentInfoById(id)
            .then(data => {
                this.payment_info = data;
                this.payment_info_loaded = true;
            })
            .catch(err => {
                console.log(err);
            });
    }

    seenNotifById(id): void {
        if (this.notifBody.is_seen === false) {
            this.notifService.seenNotifById(id)
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.displayNotifBody_cancelled = false;
        this.displayNotifBody_viewpay = false;
        this.refreshNotif();
    }

    deleteNotifById(id): void {
        this.notifService.deleteNotifById(id)
            .then(data => {
                console.log(JSON.stringify(data));
            })
            .catch(err => console.log(err));
        this.displayNotifBody_viewpay = false;
        this.displayNotifBody_cancelled = false;
        this.refreshNotif();
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    el_color(is_seen) {
        const color = '#8BC34A';
        if (is_seen) {
            return '#FFF';
        }
        return color;
    }

    font_color(is_seen) {
        const color = '#FFF';
        if (is_seen) {
            return '#8BC34A';
        }
        return color;
    }
}
