import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from '../../services/main.service';
import {MatSnackBar} from '@angular/material';

declare var $;
declare var JQuery;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MainService]
})

export class CartComponent implements OnInit {
  filltable = [];
  userid: String;

  constructor(private mainservice: MainService, private popup: MatSnackBar) { }

  ngOnInit() {
    this.userid = localStorage.getItem('id');
    this.getMyCart();
  }

  getMyCart() {
    console.log('este es mi user id: ' + this.userid);
    this.mainservice.getMyCart(this.userid)
      .subscribe(res => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const finalprice = res[key].pro_price * res[key].pro_quantity;
            res[key].finalprice = finalprice;
            this.filltable.push(res[key]);
          }
        }
      });
  }

  /* DELETE MODAL */
  deleteItem(id) {
    $('.yes-btn').attr('id', id);
    $('#exampleModalCenter').modal('show');
  }

  deleteYes() {
    const proid = $('.yes-btn').attr('id');
    const userid = localStorage.getItem('id');
    const req = {proid: proid, userid: userid};
    this.mainservice.deleteItem(req)
      .subscribe(res => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          this.popup.open(`An error ocurred, try again...`, '', {
            duration: 2000,
          });
        }
      });
  }


  updateCart(id) {
    (document.getElementById(id) as HTMLButtonElement).disabled = false;
  }

  saveUpdate(id) {
    console.log(id);
    (document.getElementById(id) as HTMLButtonElement).disabled = true;
  }

}
