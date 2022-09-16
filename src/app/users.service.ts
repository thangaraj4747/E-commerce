import { Observable } from 'rxjs';
import { API_INFO } from './api.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginData, IRegisterationData } from './login/data/login.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  server = environment.server;
  constructor(public http: HttpClient) {}
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
  // getMyCartItem() {
  //   return this.http.get<any[]>(this.server + API_INFO.mycart, {
  //     headers: new HttpHeaders({
  //       myauthtoken: this.getMyToken() ? this.getMyToken() : '',
  //     }),
  //   });
  // }
  getMyCartItem() {
    return this.http.get<any[]>(this.server + API_INFO.mycart);
  }
  getMyCartCount() {
    return this.http.get<number>(this.server + API_INFO.cartcount);
  }
}
