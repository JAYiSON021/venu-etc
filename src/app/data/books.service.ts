import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class BookService implements OnDestroy {

    private subs: Subscription;

    constructor(private http: Http) { }

    getConfirmedBooks() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);
        this.subs = this.http.get('http://localhost:3009/v1/venue/bookings/confirmed/venue/', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    getConfirmedBooksForSched() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/bookings/confirmed/venue/', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                const events: any = [];
                for (var i in data) {
                    events.push({"title":data[i].event_type, "start":data[i].event_date.from, "end":data[i].event_date.to})
                }
                data = events;
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getConfirmedBooksCount() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/bookings/confirmed/venue/count/', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    getUnConfirmedBooks() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/bookings/unconfirmed/venue/', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    getUnConfirmedBooksCount() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/bookings/unconfirmed/venue/count/', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    ConfirmBook(id) {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);
        headers.append('Access-Control-Allow-Origin', '*');

        this.http.put('http://localhost:3009/v1/venue/bookings/confirm/' + id, null, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            console.log(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
