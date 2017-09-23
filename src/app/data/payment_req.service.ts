import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { ServerConfig } from './config';

@Injectable()
export class PaymentReqService implements OnDestroy {

    private subs: Subscription;

    private serverUrl: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    submitPR(newPRInfo) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            headers.append('Content-Type', 'application/json');
            this.subs = this.http.post(`${this.serverUrl}v2/pr/new`, JSON.stringify(newPRInfo), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getPRs(id) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            headers.append('Content-Type', 'application/json');
            this.subs = this.http.get(`${this.serverUrl}v2/pr/info/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    deletePR(pr) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            headers.append('Content-Type', 'application/json');
            this.subs = this.http.put(`${this.serverUrl}v2/pr/delete`, JSON.stringify(pr), {headers: headers})
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
