import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class CompAuthService {
  authToken: any;
  company: any;

  constructor(private http: Http) { }

  companyLoggedIn() {
    if (this.company) {
      console.log('Comp Token not expired!');
      return tokenNotExpired('id_token');
    } else {
      return false;
    }
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.company = null;
    localStorage.clear();
  }

  registerCompany(company) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/company/register', company, {headers: headers})
      .map(res => res.json());
  }

  authenticateCompany(company) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/company/authenticate', company, {headers: headers})
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

  storeCompanyData(token, company) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('company', JSON.stringify(company));
    this.authToken = token;
    this.company = company;
  }

  createJob(job) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/job/create', job, {headers: headers})
      .map(res => res.json());
  }

  getCompanyJobs() {
    if (this.companyLoggedIn()) {
      const company_id = this.company.id;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/job/company-jobs', company_id, {headers: headers})
        .map(res => res.json());
    }
  }
}
