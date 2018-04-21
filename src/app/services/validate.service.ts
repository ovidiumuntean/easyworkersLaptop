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

  validateAddress(address){
    if(address.address1 == undefined || address.city == undefined || address.county == undefined || address.country == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // check if an object is empty ( true = empty, and false = not empty)
  isEmpty(obj) {
    for ( var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }// end isEmpty

  // check if a propriety is empty
  validateObj(obj){
    if(!this.isEmpty(obj)) {
      for (var key in obj) {
        if (obj[key] === undefined) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  //converting date Object to string (Format: YYYY-MM-DD )
  dateToString(date) {
    try {
      date = new Date(date);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return date.getFullYear() + '-' + month + '-' + day;
    } catch (e) {
      return  "Date cannot be converted! Convert to jvascript Date Obj first! " + e;
    }
  };// end dateToString
}
