import { SnackbarService } from './../snackbar.service';
import { ProductsService } from './../products.service';
import { Router } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  constructor(
    public userSer: UsersService,
    public myRouter: Router,
    public pdtSer: ProductsService,
    public snackBarSer: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.userSer.isLoggedIn()) {
      this.getMyCartCount();
    }
    this.userSer.cartCount.subscribe({
      next: () => {
        if (!this.userSer.isLoggedIn()) {
          this.cartCount = 0;
          return;
        }
        this.getMyCartCount();
      },
    });
  }
  doLogout() {
    localStorage.clear();
    this.myRouter.navigateByUrl('/login');
    this.cartCount = 0;
  }
  getMyCartCount() {
    this.userSer.getMyCartCount().subscribe({
      next: (data: number) => {
        this.cartCount = data;
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
}
