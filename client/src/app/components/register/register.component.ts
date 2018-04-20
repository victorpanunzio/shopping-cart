import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import {Router} from '@angular/router';

import globalfunctions = require('../../globalfunctions');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MainService]
})
export class RegisterComponent implements OnInit {
  myfields: Array<String> = [];
  name: String;
  email: String;
  username: String;
  password: String;

  constructor(private mainService: MainService, private route: Router) { }

  ngOnInit() {
  }

  register() {
    this.myfields.push(this.name);
    this.myfields.push(this.email);
    this.myfields.push(this.username);
    this.myfields.push(this.password);
    // const mydata = this.generateData('register-form', this.myfields);
    const mydata = globalfunctions.generateData('register-form', this.myfields);
    console.log(mydata);
    this.mainService.userRegister(mydata) // to pass the data to the service that  will handle the post request
      .subscribe(res => {
        setTimeout(() => this.route.navigate(['/login']), 2000);
      });
  }
}
