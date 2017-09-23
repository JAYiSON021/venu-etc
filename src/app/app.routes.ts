import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// My UnAuth Components
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegistrationComponent } from './registration/registration.component';
import { UnAuthGuard } from './protection/_guards/unauth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'home', component: LandingComponent, canActivate: [UnAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
    { path: 'register', component: RegistrationComponent, canActivate: [UnAuthGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
