import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { UsersService } from './users.service';

@Injectable()
export class HttpinterceptorService implements HttpInterceptor {
  constructor(
    public userSer: UsersService,
    public spinnerSer: SpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerSer.showSpinner();
    var tokenReq = req.clone({
      setHeaders: {
        myauthtoken: this.userSer.getMyToken() ? this.userSer.getMyToken() : '',
      },
    });
    return next
      .handle(tokenReq)
      .pipe(finalize(() => this.spinnerSer.hideSpinner()));
  }
}
