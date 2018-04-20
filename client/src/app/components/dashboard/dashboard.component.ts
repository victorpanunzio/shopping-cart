import { Component, OnInit } from '@angular/core';
import { CategorycardComponent } from '../categorycard/categorycard.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cardcomponent: Array<any> = [
    {
      cardheader: 'Shoes',
      title: 'first shit',
      description: 'Nike shoes',
      path: 'https://gloimg.rowcdn.com/ROSE/pdm-product-pic/Clothing/2016/07/18/source-img/20160718114639_13861.jpg'
    },
    {
      cardheader: 'Shirts',
      title: 'second shit',
      description: 'Polo shirts',
      path: 'https://gloimg.rowcdn.com/ROSE/pdm-product-pic/Clothing/2016/07/18/source-img/20160718114639_13861.jpg'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  // METHODS
  showProductsList() {
  }

}
