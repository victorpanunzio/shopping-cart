import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { MainService } from '../../services/main.service';

declare var $;
declare var JQuery;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MainService]
})

export class HeaderComponent implements OnInit {

  username = localStorage.getItem('username');
  quantity;
  searcharray = [];
  constructor(private route: Router, private popup: MatSnackBar, private mainservice: MainService) { }

  ngOnInit() {
    if (localStorage.getItem('id') != null) {
      $('.private-item').css('display', 'none');
      this.getCartQuantity();
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

  getCartQuantity() {
    this.mainservice.getCartQuantity(localStorage.getItem('id'))
      .subscribe(res => {
        this.quantity = res.q;
      });
  }

  searchItem() {
    const searchkey = {key: $('#search-input').val()};
    $('#search-input').val('');
    this.mainservice.searchProduct(searchkey)
      .subscribe(res => {
        if (res.status === 404) {
          setTimeout( () => $('#modal404').modal('show'), 2200);
        } else {
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              console.log(res[key]);
              this.searcharray.push(res[key]);
            }
          }
          setTimeout( () => $('#searchmodal').modal('show'), 2200);
        }
      });
      this.searcharray = [];
  }

}
