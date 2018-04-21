import {Address} from "./address";

export class User {
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: string;
  phone_no: string;
  email: string;
  permission: string;
  status: string;
  picture: any;
  cv: any;
  password: string;
  address: Address;

  constructor(){
    this.address = new Address();
  }

}
