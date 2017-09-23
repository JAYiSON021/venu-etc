import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { ServerConfig } from './config';

@Injectable()
export class UploadService implements OnDestroy {

    private subs: Subscription;

    private server_url: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem('token');
    }

    uploadVadminPic(formData): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.post(`${this.server_url}v2/upload/vadmin`, formData, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    uploadVenuePic(formData, id): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.post(`${this.server_url}v2/upload/venuethumb/${id}`, formData, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    uploadVenueGall(formData, id): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.post(`${this.server_url}v2/upload/venuegallery/${id}`, formData, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    uploadOrgPic(formData): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Authorization', this.getToken());
            this.subs = this.http.post(`${this.server_url}v2/upload/org`, formData, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getLatLong(address): Promise<any> {
        return new Promise((resolve, reject) => {
            this.subs = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD00vJM9gT5ymosscaHbRIzQkJGwJH-r80`)
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
