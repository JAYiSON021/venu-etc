import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../protection/_services/auth.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
  selector: 'vn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  returnUrl: string;

  msgs: Message[] = [];

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

  ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
        const credentials = {
            email: this.model.email,
            password: this.model.password
        };
        this.authenticationService.login(credentials)
        .then((result) => {
            this.showSuccess();
            this.router.navigate(['/dashboard']);
        }, (err) => {
            this.showError('Invalid Login Credentials');
        });
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess() {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Log In', detail: 'Log In Successful!'});
    }

}
