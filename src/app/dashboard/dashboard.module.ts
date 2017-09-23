import { TaskService } from '../data/tasks.service';
import { EventService } from '../data/events.service';
import { PaymentInfoService } from '../data/payment_info.service';
import { NotifService } from '../data/notif.service';
import { UploadService } from '../data/upload.service';
import { ServerConfig } from '../data/config';
import { PaymentReqService } from '../data/payment_req.service';
import { LookerService } from '../data/looker.service';
import { ReservationReqService } from '../data/reservation_req.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/toPromise';

import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// dashboard Components
import { DashFooterComponent } from './dash-footer';
import { DashMenuComponent, SubMenuComponent } from './dash-menu';
import { DashProfileComponent } from './dash-profile';
import { DashTopbarComponent } from './dash-topbar';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { RequestsComponent } from './requests/requests.component';
import { SchedComponent } from './sched/sched.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from '../protection/_guards/auth.guard';
import { VAdminService } from '../data/vadmin.service';
import { VenueService } from '../data/venue.service';
import { OrgService } from '../data/org.service';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueMainComponent } from './venues/venue-main/venue-main.component';
import { VenueListComponent } from './venues/venue-list/venue-list.component';
import { VenueAddComponent } from './venues/venue-add/venue-add.component';
import { VenueDetailComponent } from './venues/venue-detail/venue-detail.component';
import { VenueEditComponent } from './venues/venue-edit/venue-edit.component';

const dashRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
        { path: 'vadmin', component: UserProfileComponent },
        { path: 'org', component: OrgDetailsComponent },
        { path: 'req', component: RequestsComponent },
        { path: 'sched', component: SchedComponent },
        { path: 'tasks', component: TasksComponent },
        { path: 'venues', component: VenuesComponent, children: [
            { path: 'do', component: VenueMainComponent, children: [
                { path: 'add', component: VenueAddComponent },
                { path: 'list', component: VenueListComponent },
                { path: '', redirectTo: 'list', pathMatch: 'full' },
                { path: '**', redirectTo: 'list', pathMatch: 'full' },
            ]},
            { path: 'details/:id', component: VenueDetailComponent },
            { path: 'new', component: VenueAddComponent },
            { path: 'edit/:id', component: VenueEditComponent },
            { path: '', component: VenueMainComponent },
            { path: '**', redirectTo: 'do', pathMatch: 'full' },
        ] },
        { path: '', component: MainComponent },
        { path: '**', component: MainComponent }
    ] }
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        CommonModule,
        HttpModule,
        RouterModule.forChild(dashRoutes),
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule
    ],
    declarations: [
        DashboardComponent,
        DashFooterComponent,
        DashMenuComponent,
        SubMenuComponent,
        DashProfileComponent,
        DashTopbarComponent,
        MainComponent,
        RequestsComponent,
        SchedComponent,
        TasksComponent,
        UserProfileComponent,
        OrgDetailsComponent,
        VenuesComponent,
        VenueMainComponent,
        VenueListComponent,
        VenueAddComponent,
        VenueDetailComponent,
        VenueEditComponent,
    ],
    exports: [ RouterModule ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        AuthGuard,
        VAdminService,
        VenueService,
        OrgService,
        ReservationReqService,
        LookerService,
        PaymentReqService,
        ServerConfig,
        UploadService,
        NotifService,
        PaymentInfoService,
        EventService,
        TaskService
    ]
})
export class DashboardModule {}
