import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { ServerConfig } from './config';

@Injectable()
export class OrgService implements OnDestroy {

    private subs: Subscription;

    private server_url: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    getOrgInfo() {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());

            this.subs = this.http.get(`${this.server_url}v2/org/info`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    updateOrgInfo(updatedOrgInfo) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            headers.append('Content-Type', 'application/json');
            this.subs = this.http.put(`${this.server_url}v2/org/update`, JSON.stringify(updatedOrgInfo), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    updateOrgLocInfo(updatedOrgLocInfo) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            headers.append('Content-Type', 'application/json');
            this.subs = this.http.put(`${this.server_url}v2/org/update/loc`, JSON.stringify(updatedOrgLocInfo), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getMyVenues() {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.server_url}v2/org/venues`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getMyVenuesSchedList() {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.server_url}v2/org/venues/schedlist/sched`, {headers: headers})
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
