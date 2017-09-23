import {Component, Inject, forwardRef} from '@angular/core';
import { DashboardComponent } from './dashboard.component';

@Component({
    selector: 'vn-footer',
    template: `
        <div class="footer">
            <div class="card clearfix">
                <span class="footer-text-left">VENU Portal - &copy; Jayson San Agustin 2017</span>
                <span class="footer-text-right"><span class="ui-icon ui-icon-copyright"></span>  <span>All Rights Reserved</span></span>
            </div>
        </div>
    `
})
export class DashFooterComponent {
}
