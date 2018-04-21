import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Address} from '../../../models/address';
import {User} from '../../../models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  newUser: User;
  picture: any;
  first_name: string;
  last_name: string;
  birthday: Date;
  phone_no: string;
  email: string;
  password: string;
  gender: string;
  address: Address;

  constructor(
    private authService: AuthService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) {
    this.address = new Address();
    this.user = new User();
    this.newUser = new User();
    this.newUser.address = this.address;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        if(this.user){
          this.cloneUserObject(this.user, this.newUser);
          if(this.user.picture){
            this.setImgUrl();
          }
        }
      },
      err => {
        console.log(err);
        return false;
      });
  }

  cloneUserObject(obj1, obj2){
    for(var key in obj1){
      if(key === "address" ){
        obj2[key] = new Address();
        if(obj1[key] === null){
          obj1[key] = new Address();
        } else {
          this.cloneUserObject(obj1[key], obj2[key]);
        }
      } else {
        obj2[key] = obj1[key];
      }
    }
  }

  onGender(event){
    console.log(this.gender);
  }

  setImgUrl(){
    if (this.user.picture) {
      // var file = new Blob([this.books[i].image], {
      //   type: 'image/jpeg'
      // });
      try {
        var base64String = new Uint8Array(this.user.picture.data);
        const file = new Blob([new Uint8Array(this.user.picture.data)], {type: "image/jpg"});
        var objurl = URL.createObjectURL(file);
        this.picture = objurl;
        console.log(this.picture);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  onImage(event){
    const file = new Blob([event.target.files[0]]);
    var objurl = URL.createObjectURL(file);
    this.picture = objurl;
    var formData = new FormData();
    var img = event.target.files[0];
    formData.append('picture', img, img.name);
    this.authService.updateImage(formData).subscribe( data => {
      if (data.success) {
        this.flashMessage.show('Picture updated successfully!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Error in updating the picture!', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  createUpdateObject(oldObj, newObj, objChanges){
    for(var key in newObj){
      if(typeof newObj[key] === "object" && key === "address" && !this.validateService.isEmpty(newObj[key])){

        this.createUpdateObject(oldObj[key], newObj[key], objChanges[key]);
      } else if(oldObj[key] !== newObj[key] && key !== 'picture' && !this.validateService.isEmpty(newObj[key])){
        objChanges[key] = newObj[key];
      }
    }
  }

  onUpdateProfile(){
    console.log(this.user);
    console.log(this.newUser);
    var updateDetails = new User();
    this.createUpdateObject(this.user, this.newUser, updateDetails);

    if(this.validateService.validateObj(updateDetails) && !this.validateService.isEmpty(updateDetails)){
      this.authService.updateProfile(updateDetails).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      });
    } else {
      this.flashMessage.show('No changes are made!', {cssClass: 'alert-danger', timeout: 3000});
    }
    console.log(updateDetails);
  }

}
