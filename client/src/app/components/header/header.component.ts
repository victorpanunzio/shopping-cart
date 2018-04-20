import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

declare var $;
declare var JQuery;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  username = localStorage.getItem('username');
  quantity = '500';
  constructor(private route: Router, private popup: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('id') != null) {
      $('.private-item').css('display', 'none');
    } else {
      $('.user-item-nav').css('display', 'none');
      $('.private-item').css('display', 'block');
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    this.popup.open('Log out successful', '', {duration: 3000});
    setTimeout(() => {
      window.location.reload();
      this.route.navigate(['/']);
    }, 3000);
  }
}
