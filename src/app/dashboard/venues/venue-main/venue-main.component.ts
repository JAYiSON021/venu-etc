import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrgService } from '../../../data/org.service';

@Component({
    selector: 'vn-venue-main',
    templateUrl: './venue-main.component.html',
    styleUrls: ['./venue-main.component.css']
})
export class VenueMainComponent implements OnInit {

    public orgData: any = [];

    constructor(private _orgService: OrgService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.getOrgInfo();
        this.viewList();
    }

    getOrgInfo(): void {
        this._orgService.getOrgInfo()
        .then(result => {
            this.orgData = result;
        }, (err) => {
            console.log(err);
        });
    }

    viewList(): void {
        this.router.navigate(['list'], { relativeTo: this.route });
    }

    viewAdd(): void {
        this.router.navigate(['add'], { relativeTo: this.route });
    }

}
