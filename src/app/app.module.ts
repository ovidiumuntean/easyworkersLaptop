import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {DatePickerModule} from 'ng2-datepicker-bootstrap';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatCardModule} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { ProfileComponent } from './pages/user/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

import { EmployeeRegisterComponent } from './pages/company/employee-register/employee-register.component';
import { CompanyRegisterComponent } from './pages/company/company-register/company-register.component';
import { CompanyHomeComponent } from './pages/company/company-home/company-home.component';
import { CompanyProfileComponent } from './pages/company/company-profile/company-profile.component';
import { CompanyLoginComponent } from './pages/company/company-login/company-login.component';
import { CreateJobComponent } from './pages/company/create-job/create-job.component';
import { ViewJobsComponent } from './pages/job/view-jobs/view-jobs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewJobComponent } from './pages/job/view-job/view-job.component';
import { JobApplicationsComponent } from './pages/job/job-applications/job-applications.component';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'employeeRegister', component: EmployeeRegisterComponent},
  {path:'company/register', component: CompanyRegisterComponent},
  {path:'company/login', component: CompanyLoginComponent},
  {path:'company/profile', component: CompanyProfileComponent, canActivate:[AuthGuard]},
  {path:'company/createJob', component: CreateJobComponent, canActivate:[AuthGuard]},
  {path:'company/jobs', component: ViewJobsComponent, canActivate:[AuthGuard]},
  {path:'company', component: CompanyHomeComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'job/view-job', component: ViewJobComponent, canActivate:[AuthGuard]},
  {path:'job/job-applications', component: JobApplicationsComponent, canActivate:[AuthGuard]}
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
    ViewJobsComponent,
    SidebarComponent,
    ViewJobComponent,
    JobApplicationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // DatePickerModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
