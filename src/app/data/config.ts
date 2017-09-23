import { Injectable } from '@angular/core';

@Injectable()
export class ServerConfig {
    public serverUrl: String = 'http://nodejs-mongo-persistent-venu-etc.a3c1.starter-us-west-1.openshiftapps.com/';

    getServerUrl(): String {
        return this.serverUrl;
    }
}