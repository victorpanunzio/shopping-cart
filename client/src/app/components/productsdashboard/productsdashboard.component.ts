import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import {MatSnackBar} from '@angular/material';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-productsdashboard',
  templateUrl: './productsdashboard.component.html',
  styleUrls: ['./productsdashboard.component.css'],
  providers: [MainService]
})
export class ProductsdashboardComponent implements OnInit {

  products = [];

  constructor(private mainservice: MainService, private popup: MatSnackBar) { }

  ngOnInit() {
    this.getAll();
    this.hideBtn();
  }

  getAll() {
    console.log('haz dado clic');
    this.mainservice.getAllProducts()
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]);
          this.products.push(res[i]);
        }
      });
  }

  addToCart(proid) {
    const q = $('#' + proid + '').val();
    console.log(proid);
    console.log(q);
    const productid = { pro_userid: localStorage.getItem('id'), pro_id: proid, quantity: q };
    console.log(productid);
    this.mainservice.addToCart(productid)
      .subscribe(res => {
        this.popup.open(res.msg, '', {
          duration: 2000
        });
        setTimeout(() => window.location.reload(), 2000);
      });
  }

  hideBtn() {
    if (localStorage.getItem('id') != null) {
      document.getElementById('add-to-cart-btn').style.display = 'none';
    }
  }

}
