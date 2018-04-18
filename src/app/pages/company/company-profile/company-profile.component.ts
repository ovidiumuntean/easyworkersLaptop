import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  employee: Object;


  constructor(private authService:AuthService, private router:Router) { }
  ngOnInit() {
    console.log('emp profile!');
    this.authService.getEmployeeProfile().subscribe(profile => {
        this.employee = profile.employee;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
