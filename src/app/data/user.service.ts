import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class UserService implements OnDestroy {
    private subs: Subscription;
    constructor(private http: Http) { }

    getUserInfo() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/info/me', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    getLookerDetails(id) {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3005/v1/looker/' + id, {headers: headers})
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
