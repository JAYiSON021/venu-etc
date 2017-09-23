import { ServerConfig } from './config';
import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class ReservationReqService implements OnDestroy {

    private subs: Subscription;

    private serverUrl: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    getReservationReq() {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/access/reservation_req/vadmin`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getReservationById(id) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/reservation/info/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    doApproveRequest(reqBody) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.put(`${this.serverUrl}v2/reservation/do/approve`, reqBody, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    doRejectRequest(reqBody) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.put(`${this.serverUrl}v2/reservation/do/reject`, reqBody, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
