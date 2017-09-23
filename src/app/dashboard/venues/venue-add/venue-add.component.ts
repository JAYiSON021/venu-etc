import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { VenueService } from '../../../data/venue.service';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
    selector: 'vn-venue-add',
    templateUrl: './venue-add.component.html',
    styleUrls: ['./venue-add.component.css']
})
export class VenueAddComponent implements OnInit {

    newVenueForm: FormGroup;

    categoriesOpts: SelectItem[];

    featuresOpts: SelectItem[];

    categories: string[] = [];

    features: string[] = [];

    displayDiscard: Boolean = false;

    msgs: Message[] = [];

    currencyOpts: SelectItem[];

    valueOpts: SelectItem[];

    unitOpts: SelectItem[];

    dayRangeOpts: SelectItem[];

    timeRangeFromOpts: SelectItem[];

    timeRangeToOpts: SelectItem[];

    constructor(private fb: FormBuilder, private _venueService: VenueService) { }

    ngOnInit() {
        this.OptsInit();
    }

    OptsInit() {
        this.categoriesOpts = [];
        this.categoriesOpts.push({label: 'Wedding', value: 'Wedding'});
        this.categoriesOpts.push({label: 'Conferences', value: 'Conferences'});
        this.categoriesOpts.push({label: 'Corporate', value: 'Corporate'});
        this.categoriesOpts.push({label: 'Training', value: 'Training'});
        this.categoriesOpts.push({label: 'Unusual venue', value: 'Unusual venue'});
        this.categoriesOpts.push({label: 'Special Ocasions', value: 'Special Ocasions'});
        this.categoriesOpts.push({label: 'Business Meeting', value: 'Business Meeting'});
        this.categoriesOpts.push({label: 'Sports', value: 'Sports'});
        this.categoriesOpts.push({label: 'Social Event', value: 'Social Event'});
        this.categoriesOpts.push({label: 'Unusual Venues', value: 'Unusual Venues'});

        this.featuresOpts = [];
        this.featuresOpts.push({label: 'Handicapped Accesible', value: 'Handicapped Accesible'});
        this.featuresOpts.push({label: 'Catering Services', value: 'Catering Services'});
        this.featuresOpts.push({label: 'AC Equipped', value: 'AC Equipped'});
        this.featuresOpts.push({label: 'Audio/Visual Facilities', value: 'Audio/Visual Facilities'});
        this.featuresOpts.push({label: 'Pay Parking', value: 'Pay Parking'});
        this.featuresOpts.push({label: 'Free parking', value: 'Free parking'});
        this.featuresOpts.push({label: 'Great Views', value: 'Great Views'});
        this.featuresOpts.push({label: 'Child Friendly', value: 'Child Friendly'});
        this.featuresOpts.push({label: 'For Adults Only', value: 'For Adults Only'});
        this.featuresOpts.push({label: 'Stage', value: 'Stage'});

        this.currencyOpts = [];
        this.currencyOpts.push({label: 'PHP', value: 'PHP'});
        this.currencyOpts.push({label: 'USD', value: 'USD'});

        this.valueOpts = [];
        this.valueOpts.push({label: '5+', value: '5'});
        this.valueOpts.push({label: '100+', value: '100'});
        this.valueOpts.push({label: '500+', value: '500'});
        this.valueOpts.push({label: '1000+', value: '1000'});
        this.valueOpts.push({label: '2000+', value: '2000'});
        this.valueOpts.push({label: '5000+', value: '5000'});
        this.valueOpts.push({label: '10,000+', value: '10000'});
        this.valueOpts.push({label: '20,000+', value: '20000'});
        this.valueOpts.push({label: '50,000+', value: '50000'});
        this.valueOpts.push({label: '100,000+', value: '100000'});

        this.unitOpts = [];
        this.unitOpts.push({label: 'per Head', value: 'Head'});
        this.unitOpts.push({label: 'per Hour', value: 'Hour'});
        this.unitOpts.push({label: 'per Day', value: 'Day'});

        this.dayRangeOpts = [];
        this.dayRangeOpts.push({label: 'Weekdays', value: 'Weekdays'});
        this.dayRangeOpts.push({label: 'Mondays', value: 'Mondays'});
        this.dayRangeOpts.push({label: 'Tuesdays', value: 'Tuesdays'});
        this.dayRangeOpts.push({label: 'Wednesdays', value: 'Wednesdays'});
        this.dayRangeOpts.push({label: 'Thursdays', value: 'Thursdays'});
        this.dayRangeOpts.push({label: 'Fridays', value: 'Fridays'});
        this.dayRangeOpts.push({label: 'Saturdays', value: 'Saturdays'});
        this.dayRangeOpts.push({label: 'Sundays', value: 'Sundays'});

        this.timeRangeFromOpts = [];
        this.timeRangeFromOpts.push({label: '1AM', value: '1AM'});
        this.timeRangeFromOpts.push({label: '2AM', value: '2AM'});
        this.timeRangeFromOpts.push({label: '3AM', value: '3AM'});
        this.timeRangeFromOpts.push({label: '4AM', value: '4AM'});
        this.timeRangeFromOpts.push({label: '5AM', value: '5AM'});
        this.timeRangeFromOpts.push({label: '6AM', value: '6AM'});
        this.timeRangeFromOpts.push({label: '7AM', value: '7AM'});
        this.timeRangeFromOpts.push({label: '8AM', value: '8AM'});
        this.timeRangeFromOpts.push({label: '9AM', value: '9AM'});
        this.timeRangeFromOpts.push({label: '10AM', value: '10AM'});
        this.timeRangeFromOpts.push({label: '11AM', value: '11AM'});
        this.timeRangeFromOpts.push({label: '12AM', value: '12AM'});
        this.timeRangeFromOpts.push({label: '1PM', value: '1PM'});
        this.timeRangeFromOpts.push({label: '2PM', value: '2PM'});
        this.timeRangeFromOpts.push({label: '3PM', value: '3PM'});
        this.timeRangeFromOpts.push({label: '4PM', value: '4PM'});
        this.timeRangeFromOpts.push({label: '5PM', value: '5PM'});
        this.timeRangeFromOpts.push({label: '6PM', value: '6PM'});
        this.timeRangeFromOpts.push({label: '7PM', value: '7PM'});
        this.timeRangeFromOpts.push({label: '8PM', value: '8PM'});
        this.timeRangeFromOpts.push({label: '9PM', value: '9PM'});
        this.timeRangeFromOpts.push({label: '10PM', value: '10PM'});
        this.timeRangeFromOpts.push({label: '11PM', value: '11PM'});
        this.timeRangeFromOpts.push({label: '12PM', value: '12PM'});

        this.timeRangeToOpts = [];
        this.timeRangeToOpts.push({label: '1AM', value: '1AM'});
        this.timeRangeToOpts.push({label: '2AM', value: '2AM'});
        this.timeRangeToOpts.push({label: '3AM', value: '3AM'});
        this.timeRangeToOpts.push({label: '4AM', value: '4AM'});
        this.timeRangeToOpts.push({label: '5AM', value: '5AM'});
        this.timeRangeToOpts.push({label: '6AM', value: '6AM'});
        this.timeRangeToOpts.push({label: '7AM', value: '7AM'});
        this.timeRangeToOpts.push({label: '8AM', value: '8AM'});
        this.timeRangeToOpts.push({label: '9AM', value: '9AM'});
        this.timeRangeToOpts.push({label: '10AM', value: '10AM'});
        this.timeRangeToOpts.push({label: '11AM', value: '11AM'});
        this.timeRangeToOpts.push({label: '12AM', value: '12AM'});
        this.timeRangeToOpts.push({label: '1PM', value: '1PM'});
        this.timeRangeToOpts.push({label: '2PM', value: '2PM'});
        this.timeRangeToOpts.push({label: '3PM', value: '3PM'});
        this.timeRangeToOpts.push({label: '4PM', value: '4PM'});
        this.timeRangeToOpts.push({label: '5PM', value: '5PM'});
        this.timeRangeToOpts.push({label: '6PM', value: '6PM'});
        this.timeRangeToOpts.push({label: '7PM', value: '7PM'});
        this.timeRangeToOpts.push({label: '8PM', value: '8PM'});
        this.timeRangeToOpts.push({label: '9PM', value: '9PM'});
        this.timeRangeToOpts.push({label: '10PM', value: '10PM'});
        this.timeRangeToOpts.push({label: '11PM', value: '11PM'});
        this.timeRangeToOpts.push({label: '12PM', value: '12PM'});

        this.formInit();
    }

    formInit() {
        this.newVenueForm = this.fb.group({
            tab1Group: this.fb.group({
                name: ['', Validators.required],
                capMin: [2, [Validators.required]],
                capMax: [2, [Validators.required]],
                location: ['', Validators.required]
            }),
            overview: ['', Validators.required],
            tab2Group: this.fb.group({
                categories: [this.categories, Validators.required],
                features: [this.features, Validators.required],
            }),
            resPolicy: ['', [Validators.required, Validators.maxLength(200)]],
            costs: this.fb.array([ this.buildCostGroup() ]),
            availabilities: this.fb.array([ this.buildAvailabilityGroup() ])
        });
    }

    get costs(): FormArray {
        return <FormArray>this.newVenueForm.get('costs');
    }

    get availabilities(): FormArray {
        return <FormArray>this.newVenueForm.get('availabilities');
    }

    buildCostGroup(): FormGroup {
        return this.fb.group({
            cur: ['PHP', Validators.required ],
            value: ['5000', Validators.required ],
            unit: ['Day', Validators.required ]
        });
    }

    buildAvailabilityGroup(): FormGroup {
        return this.fb.group({
            dayRange: ['Weekdays', Validators.required ],
            timeRangeFrom: ['7AM', Validators.required ],
            timeRangeTo: ['9PM', Validators.required ]
        });
    }

    addCost(): void {
        this.costs.push(this.buildCostGroup());
    }

    addAvailability(): void {
        this.availabilities.push(this.buildAvailabilityGroup());
    }

    removeCost(index: number): void {
        this.costs.removeAt(index);
    }

    removeAvailability(index: number): void {
        this.availabilities.removeAt(index);
    }

    closeDiscardDialogAndInitForm() {
        this.displayDiscard = false;
        this.formInit();
    }

    save() {
        let formVal: any = [];
        formVal = this.newVenueForm.value;
        const newVenue = {
            vname: formVal.tab1Group.name,
            vlocation: formVal.tab1Group.location,
            max: formVal.tab1Group.capMax,
            min: formVal.tab1Group.capMin,
            venue_type: formVal.tab2Group.categories,
            features: formVal.tab2Group.features,
            overview: formVal.overview,
            reservation_policy: formVal.resPolicy,
            costs: formVal.costs,
            availability: formVal.availabilities
        };
        this._venueService.addVenue(newVenue)
        .then((result) => {
            let msg: any = [];
            msg = result;
            this.showSuccess(msg.message);
            this.formInit();
        }, (err) => {
            this.showError('Cannot add a new Venue');
        });
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess(successmsg) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: successmsg});
    }

}
