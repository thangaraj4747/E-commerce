import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_INFO } from './api.constant';
import { IListProducts } from './Products/listproducts/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  server = environment.server;
  constructor(public http: HttpClient) {}
  getProductList(): Observable<IListProducts[]> {
    return this.http.get<IListProducts[]>(this.server + API_INFO.listProducts);
  }
}
