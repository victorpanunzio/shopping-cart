import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MainService } from '../../services/main.service';
import {MatSnackBar} from '@angular/material';

import globalfunctions = require('../../globalfunctions');

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css'],
  providers: [MainService]
})

export class ProductformComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  /* ngModel */
  proname: String;
  prodescription: String;
  proquantity: Number;
  proprice: Number;

  /* table */
  filltable = [];
  /* myfields */
  myfields: Array<any> = [];

  constructor(private _formBuilder: FormBuilder, private mainservice: MainService, private popup: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getMyProducts();
  }

  toggle(id) {
    console.log(id);
    // document.getElementById(id).style.display = 'block';
    $('#' + id + '').slideToggle();
  }

  uploadProduct() {
    this.myfields.push(this.proname);
    this.myfields.push(this.prodescription);
    // this.myfields.push(this.proimage);
    this.myfields.push(this.proquantity);
    this.myfields.push(this.proprice);
    const fd = new FormData();
    fd.append('proname', this.proname.toString());
    fd.append('prodescription', this.prodescription.toString());
    fd.append('proimage', $('#proimage').val().split('/').pop().split('\\').pop());
    fd.append('file', $('#proimage')[0].files[0]);
    fd.append('proquantity', this.proquantity.toString());
    fd.append('proprice', this.proprice.toString());
    fd.append('userid', localStorage.getItem('id'));
    this.mainservice.productRegister(fd)
      .subscribe((res) => {
        console.log('TODO OK POR AQUI' + res);
      });
    setTimeout(() => $('#upload-pro-div').slideUp(), 2000);
  }

  getMyProducts() {
    const req = {userid: localStorage.getItem('id')};
    this.mainservice.getMyProducts(req)
      .subscribe(res => {
        console.log(res);
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
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

}
