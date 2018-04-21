import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  company: any;
  employee: any;
  baseUrl: string = "http://localhost:3000/";

  constructor(private http: Http) { }

  checkLocalStorage(){
    try {
      if(localStorage.getItem('user')) {
        this.user = localStorage.getItem('user');
      } else if (localStorage.getItem('employee')){
        this.employee = localStorage.getItem('employee');
      }
      this.authToken = localStorage.getItem('id_token');
    } catch (e) {
      this.logout();
    }
  }

  //********************************    User METHODS    ********************************************
  registerUser(user) {
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/register', user, options)
      .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/user/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    this.checkLocalStorage();
    if (this.user) {
      console.log('Token not expired!');
      return tokenNotExpired('id_token');
    } else {
      return false;
    }
  }

  updateImage(image){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.put(this.baseUrl + 'user/update-image', image, {headers: headers})
      .map(res => res.json());
  }

  updateProfile(updateData){
    if (this.loggedIn()) {
      const headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      return this.http.put('http://localhost:3000/user/update', updateData, {headers: headers})
        .map(res => res.json());
    }
  }


  // *********************      COMPANY/EMPLOYEE METHODS    *******************************
  employeeLoggedIn() {
    this.checkLocalStorage();
    if (this.employee) {
      return tokenNotExpired('id_token');
    } else {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.employee = null;
    localStorage.clear();
  }

  registerCompany(company) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/company/register', company, {headers: headers})
      .map(res => res.json());
  }

  authenticateEmployee(employee) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/employees/authenticate', employee, {headers: headers})
      .map(res => res.json());
  }

  getCompanyProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/company/profile', {headers: headers})
      .map(res => res.json());
  }

  getEmployeeProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/employees/profile', {headers: headers})
      .map(res => res.json());
  }

  storeEmployeeData(token, employee) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('employee', JSON.stringify(employee));
    this.authToken = token;
    this.employee = employee;
  }

  // getCompanyJobs() {
  //   if (this.employeeLoggedIn()) {
  //     const company_id = this.employee.companyId;
  //     const headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     return this.http.post('http://localhost:3000/job/company-jobs', company_id, {headers: headers})
  //       .map(res => res.json());
  //   }
  // }


  // JOB METHODS
  createJob(job) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/jobs/create', job, {headers: headers})
      .map(res => res.json());
  }

  getCompanyJobs() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/jobs/jobs', {headers: headers})
      .map(res => res.json());
  }

  applyForJob(job){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/jobs/apply', job, {headers: headers})
      .map(res => res.json());
  }

  getJobById(jobId){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/jobs/viewJob', {jobId: jobId}, {headers: headers})
      .map(res => res.json());
  }

  getJobApplications(){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/jobs/job-applications', {headers: headers})
      .map(res => res.json());
  }

  // getting the job application by the job id
  getJobApplicationById(applicationId){
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    const options = new RequestOptions({
      headers: headers,
      params: {jobId: applicationId}
    });
    return this.http.get('http://localhost:3000/jobs/job-application', options)
      .map(res => res.json());
  }

}
