import { ServerConfig } from '../../data/config';
import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService implements OnDestroy {

    private subs: Subscription;

    public mess: any;

    constructor(private http: Http, private router: Router, private sConfig: ServerConfig) { }

    login(credentials) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.subs = this.http.post(this.sConfig.serverUrl + 'v2/account/vadmin/login', JSON.stringify(credentials), {headers: headers})
            .subscribe(res => {
                const data = res.json();
                localStorage.setItem('token', data.token);
                resolve(data);
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }

    logout() {
      if ( this.subs ) {
        this.subs.unsubscribe();
      }
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    registerNewAdmin (newVAdmin) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.subs = this.http.post(this.sConfig.serverUrl + 'v2/account/register/vadmin', JSON.stringify(newVAdmin), {headers: headers})
            .subscribe(res => {
                const data = res.json();
                this.mess = data.message;
                console.log(this.mess);
                resolve(data);
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}
