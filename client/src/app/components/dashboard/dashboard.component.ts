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
      cardheader: 'SHIRTS',
      title: 'SHIRTS',
      description: 'Nike shirts',
      path: 'http://localhost:3000/uploads/shirts.jpg'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  // METHODS
  showProductsList() {
  }

}
