import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_INFO } from './api.constant';
import {
  IAddPdt,
  IAddtoCart,
  ICategory,
  IPdtDetails,
  IUpdateCart,
} from './Products/listproducts/products.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  server = environment.server;
  public cartCount = new Subject();
  constructor(public http: HttpClient) {}
  getProductList(): Observable<IPdtDetails[]> {
    return this.http.get<IPdtDetails[]>(this.server + API_INFO.listProducts);
  }
  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.server + API_INFO.category);
  }
  getPdtCatwise(catid: string): Observable<IPdtDetails[]> {
    return this.http.get<IPdtDetails[]>(
      this.server + API_INFO.pdtCatwise.replace('{catid}', catid)
    );
  }
  addToCart(pdtData: IAddtoCart): Observable<string> {
    return this.http.post<string>(this.server + API_INFO.addtocart, pdtData);
  }
  removeCart(pdtId: number): Observable<string> {
    return this.http.delete<string>(
      this.server + API_INFO.delete.replace('{cartid}', `${pdtId}`)
    );
  }
  updateCart(pdtDetails: IUpdateCart): Observable<string> {
    return this.http.put<string>(this.server + API_INFO.updateCart, pdtDetails);
  }
  addProduct(addPdt: any): Observable<string> {
    return this.http.post<string>(this.server + API_INFO.addproducts, addPdt);
  }
}
