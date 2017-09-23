import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class TodoService implements OnDestroy {

    private subs: Subscription;

    constructor(private http: Http) { }

    getTodos() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/todos/', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
            resolve(data);
            }, (err) => {
            reject(err);
            });
        });
    }

    AddTodo(todo) {
        return new Promise((resolve, reject) => {
            const token = 'Bearer ' + localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Access-Control-Allow-Origin', 'true');
            headers.append('Authorization', token);

            this.subs = this.http.post('http://localhost:3009/v1/venue/todo/add/'+todo,null,{headers: headers})
            .subscribe(res => {
                const data = res.json();
                resolve(data);
                resolve(res.json());
                window.location.reload();
            }, (err) => {
                reject(err);
            });
        });
    }

    UpdateTodo(creds) {
        return new Promise((resolve, reject) => {
            const token = 'Bearer ' + localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Access-Control-Allow-Origin','true');  
            headers.append('Authorization', token);

            this.subs = this.http.put('http://localhost:3009/v1/venue/todos/update/'+creds.id,creds,{headers: headers})
            .subscribe(res => {
                const data = res.json();
                resolve(data);
                console.log('task updated!');
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }

    DeleteTodo(id) {
        return new Promise((resolve, reject) => {
            const token = 'Bearer ' + localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Access-Control-Allow-Origin', 'true');
            headers.append('Authorization', token);

            this.subs = this.http.delete('http://localhost:3009/v1/venue/todos/deconste/' + id, {headers: headers})
            .subscribe(res => {
                const data = res.json();
                resolve(data);
                resolve(res.json());
                window.location.reload();
            }, (err) => {
                reject(err);
            });
        });
    }

    getCountNotDoneTodos() {
        return new Promise((resolve, reject) => {
        const token = 'Bearer ' + localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);

        this.subs = this.http.get('http://localhost:3009/v1/venue/todos/notdone/count/', {headers: headers})
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
