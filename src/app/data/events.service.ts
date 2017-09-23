import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { ServerConfig } from './config';

@Injectable()
export class EventService implements OnDestroy {

    private subs: Subscription;

    private server_url: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    getMyVenueEventsById(id) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.server_url}v2/events/venue/sched/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getMyVenueEventsMaster() {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.server_url}v2/events/venue/schedule/master`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getTodayEventsMaster() {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.server_url}v2/events/venue/schedule/master/today`, {headers: headers})
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
