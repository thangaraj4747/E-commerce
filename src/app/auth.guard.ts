import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public userSer: UsersService, public myRouter: Router) {}
  canActivate(): boolean {
    if (!this.userSer.isLoggedIn()) {
      localStorage.clear();
      this.myRouter.navigateByUrl('/');
    }
    return this.userSer.isLoggedIn();
  }
}
