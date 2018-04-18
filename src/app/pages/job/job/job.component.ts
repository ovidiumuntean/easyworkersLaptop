import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  message: String;

  constructor() { }

  ngOnInit() {
  }

  receiveMessage($event){
    this.message = $event;
  }

}
