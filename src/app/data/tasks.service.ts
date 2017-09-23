import { ServerConfig } from './config';
import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService implements OnDestroy {

    private subs: Subscription;

    private serverUrl: String = this.serverConf.getServerUrl();

    constructor(private http: Http, private serverConf: ServerConfig) { }

    private getToken(): string {
        const token = `Bearer ${localStorage.getItem('token')}`;
        return token;
    }

    newTask(newTask) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        this.subs = this.http.post(`${this.serverUrl}v2/tasks/new`, newTask, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getTask() {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/tasks/list`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    markAsDone(reqBody) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.put(`${this.serverUrl}v2/tasks/mark/done`, reqBody, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    markAsUnDone(reqBody) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.put(`${this.serverUrl}v2/tasks/mark/undone`, reqBody, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    editTask(reqBody) {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.put(`${this.serverUrl}v2/tasks/edit`, reqBody, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getDone(): Promise<any> {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/tasks/get/done`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    deleteTask(id): Promise<any> {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.delete(`${this.serverUrl}v2/tasks/delete/${id}`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCountDone(): Promise<any> {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/tasks/count/done`, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCountUnDone(): Promise<any> {
        return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Authorization', this.getToken());
        this.subs = this.http.get(`${this.serverUrl}v2/tasks/count/undone`, {headers: headers})
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
