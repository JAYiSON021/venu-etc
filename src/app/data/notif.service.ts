import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { ServerConfig } from './config';

@Injectable()
export class NotifService implements OnDestroy {

    private subs: Subscription;

    private server_url: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    newNotif(newnotifDetails) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.post(`${this.server_url}v2/notif/new`, newnotifDetails, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getOrgNotifs() {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.get(`${this.server_url}v2/notif/vadmin/org`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getOrgNotifsCount() {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.get(`${this.server_url}v2/notif/vadmin/org/count`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    seenNotifById(id) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.put(`${this.server_url}v2/notif/seen/byvadmin`, {id: id}, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    deleteNotifById(id) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.delete(`${this.server_url}v2/notif/delete/${id}`, {headers: headers})
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
