import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { ServerConfig } from './config';

@Injectable()
export class PaymentInfoService implements OnDestroy {

    private subs: Subscription;

    private serverUrl: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    getPaymentInfoById(id) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.get(`${this.serverUrl}v2/pinfo/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getPaymentInfoByResreqId(id) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.get(`${this.serverUrl}v2/pinfo/by/resreq/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getPaymentInfoByOrg() {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.get(`${this.serverUrl}v2/pinfo/get/list/vadmin`, {headers: headers})
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
