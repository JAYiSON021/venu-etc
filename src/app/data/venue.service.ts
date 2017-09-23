import { ServerConfig } from './config';
import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class VenueService implements OnDestroy {

    private subs: Subscription;

    private serverUrl: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        const token = `Bearer ${localStorage.getItem('token')}`;
        return token;
    }

    updateVenueInfo(updatedVenueInfo) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        this.subs = this.http.put(`${this.serverUrl}v2/vprofile/update`, JSON.stringify(updatedVenueInfo), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    addVenue(newVenue) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        this.subs = this.http.post(`${this.serverUrl}v2/venue/add`, JSON.stringify(newVenue), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    updateVenue(newVenueValue) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        this.subs = this.http.put(`${this.serverUrl}v2/venue/update`, JSON.stringify(newVenueValue), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getVenueById(id: String) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/venue/info/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getMyVenuesExceptOne(id: String) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/venue/not/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    deleteVenueById(id: String) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.delete(`${this.serverUrl}v2/venue/delete/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    disableVenueById(id: String) {
        const body = {id: id};
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        this.subs = this.http.put(`${this.serverUrl}v2/venue/disable/`, JSON.stringify(body), {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    enableVenueById(id: String) {
        const body = {id: id};
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        this.subs = this.http.put(`${this.serverUrl}v2/venue/enable/`, JSON.stringify(body), {headers: headers})
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
