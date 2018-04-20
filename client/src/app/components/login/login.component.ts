import { Component, OnInit, NgModule } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { MainService } from '../../services/main.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

// functions
import globalfunctions = require('../../globalfunctions');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MainService]
})

export class LoginComponent implements OnInit {

  myfields: Array<String> = [];
  username: String;
  password: String;

  constructor(private mainService: MainService, private router: Router, private popup: MatSnackBar) { }

  ngOnInit() {
  }

  login () {
    this.myfields.push(this.username);
    this.myfields.push(this.password);
    const mydata = globalfunctions.generateData('login-form', this.myfields);
    console.log(mydata);
    this.mainService.userLogin(mydata)
      .subscribe(res => {
        const myres = JSON.parse(JSON.stringify(res));
        console.log('THIS IS THE RESPONSE FROM THE SERVER: -> ' + JSON.stringify(myres));
        if (myres.status === 200) {
          globalfunctions.storageData('id', myres.userid);
          globalfunctions.storageData('username', myres.username);
          this.popup.open(`Authentication successful! Welcome ${localStorage.getItem('username')}`, '', {
            duration: 1000, extraClasses: ['mypopup']
          });
          setTimeout(() => {
            window.location.reload();
            this.router.navigate(['list']);
          }, 3000);
        } else {
          this.router.navigate(['/']);
        }
      });
  }

}
