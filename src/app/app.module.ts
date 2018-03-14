import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { CompanyLoginComponent } from './components/company-login/company-login.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { ViewCompanyJobsComponent } from './components/view-company-jobs/view-company-jobs.component';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'employeeRegister', component: EmployeeRegisterComponent},
  {path:'company/register', component: CompanyRegisterComponent},
  {path:'company/login', component: CompanyLoginComponent},
  {path:'company/profile', component: CompanyProfileComponent, canActivate:[AuthGuard]},
  {path:'company/createJob', component: CreateJobComponent},
  {path:'company/jobs', component: ViewCompanyJobsComponent},
  {path:'company', component: CompanyHomeComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    EmployeeRegisterComponent,
    CompanyRegisterComponent,
    CompanyHomeComponent,
    CompanyProfileComponent,
    CompanyLoginComponent,
    CreateJobComponent,
    ViewCompanyJobsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
