import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    console.log(user);
    if(user.first_name == undefined || user.email == undefined || user.last_name == undefined || user.password == undefined ||
        user.birthday == undefined || user.phone_no == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterCompany(company) {
    if(company.name == undefined || company.regNo == undefined || company.phoneNo == undefined || company.email == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLogin(user){
    if(user.email == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateJob(job) {
    if(job.title == undefined || job.description == undefined || job.type == undefined || job.experience == undefined || job.category == undefined ||
      job.companyId == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
