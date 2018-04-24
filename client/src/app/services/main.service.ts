import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from './Products';

import 'rxjs/add/operator/map';

@Injectable()
export class MainService {

  host: String = 'http://localhost:3000';
  headers: Headers;
  constructor(private http: HttpClient) {
  } // using http var tipo httpcilent

  userRegister(newUser) {
    // console.log(newUser);
    return this.http.post(this.host + '/user/register', newUser)
      .map(res => res); // map para obtener un observable y obtener la respuesta
  }

  userLogin(user) {
    // console.log(user); todo ok hasta aqui
    return this.http.post(this.host + '/user/login', user)
      .map(res => res);
  }

  productRegister(product) {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    console.log('you here');
    return this.http.post(this.host + '/user/uploadproduct', product, {headers: headers});
  }

  /* PROFILE SERVICES */
  getMyProducts(req) {
    return this.http.get<Products[]>(this.host + '/crud/getMyProducts/' + req.userid)
      .map((res: any) => res);
  }

  /* CRUD SERVICES (CART) */
  getAllProducts() {
    console.log('okkk');
    return this.http.get<Products[]>(this.host + '/crud/getAll')
      .map((res: any) => res);
  }

  addToCart(productid) {
    console.log('myproductshit' + JSON.stringify(productid));
    return this.http.post(this.host + '/crud/addtocart', productid)
      .map((res: any) => res);
  }

  getMyCart(userid) {
    return this.http.get(this.host + '/crud/getMyCart/' + userid)
      .map((res: any) => res);
  }

  deleteItem(req) {
    console.log(JSON.stringify(req));
    return this.http.post(this.host + '/crud/deleteitem', req)
      .map((res: any) => res);
  }

  upadteCard(req) {
    return this.http.post(this.host + '/crud/updateitem', req)
      .map((res: any) => res);
  }

}
