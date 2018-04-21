export class Address {
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  county: string;
  country: string;

  constructor(){}

  getAddressString() {
    return this.address1 + ', ' + this.address2 + ', ' + this.city + ', ' + this.county + ', ' + this.country;
  }

}
