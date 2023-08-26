import { Router } from '@angular/router';
import { IViewCart } from './Products/listproducts/products.model';
import {
  debounceTime,
  fromEvent,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { API_INFO } from './api.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginData, IRegisterationData } from './login/data/login.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  server = environment.server;
  cartCount = new Subject();
  evenHandler = new Subject();
  eventSubscription: Subscription;
  timer: any;
  constructor(public http: HttpClient, public myRouter: Router) {}
  checkAvailablity(uname: string): Observable<number> {
    return this.http.get<number>(
      this.server + API_INFO.usernameCheck.replace('{username}', uname)
    );
  }
  userRegisteration(data: IRegisterationData): Observable<string> {
    return this.http.post<string>(this.server + API_INFO.register, data);
  }
  doLogin(loginData: ILoginData): Observable<string> {
    return this.http.post<string>(this.server + API_INFO.login, loginData);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedUser');
  }
  getMyToken() {
    return localStorage.getItem('loggedUser');
  }
  /*
  getMyCartItem() {
    return this.http.get<any[]>(this.server + API_INFO.mycart, {
      headers: new HttpHeaders({
        myauthtoken: this.getMyToken() ? this.getMyToken() : '',
      }),
    });
  }
  */
  getMyCartItem() {
    return this.http.get<IViewCart[]>(this.server + API_INFO.mycart);
  }
  getMyCartCount() {
    return this.http.get<number>(this.server + API_INFO.cartcount);
  }
  listenGlobalEvents() {
    fromEvent(document, 'mouseover').subscribe({
      next: () => this.evenHandler.next(''),
    });
    fromEvent(document, 'click').subscribe({
      next: () => this.evenHandler.next(''),
    });
    fromEvent(document, 'keyup').subscribe({
      next: () => this.evenHandler.next(''),
    });
    this.eventSubscription = this.evenHandler
      .pipe(debounceTime(1000))
      .subscribe({
        next: () => {
          this.refreshTimer();
        },
      });
  }
  doSetTimeout() {
    this.timer = setTimeout(() => {
      if (this.isLoggedIn()) {
        this.doLogout();
      }
    }, 60 * 1000);
  }
  refreshTimer() {
    clearTimeout(this.timer);
    this.doSetTimeout();
  }
  doLogout() {
    localStorage.clear();
    this.myRouter.navigateByUrl('/login');
    this.cartCount.next(0);
    this.eventSubscription.unsubscribe();
  }
}
