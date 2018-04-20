import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
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

  constructor(private mainservice: MainService) { }

  ngOnInit() {
    this.getAll();
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
    const productid = { pro_userid: localStorage.getItem('id'), pro_id: proid };
    this.mainservice.addToCart(productid)
      .subscribe(res => {
      });
  }

}
