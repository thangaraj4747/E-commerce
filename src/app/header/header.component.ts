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
    public pdtSer: ProductsService
  ) {}

  ngOnInit(): void {
    this.getMyCartCount();
    this.pdtSer.cartCount.subscribe({
      next: () => {
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
      next: (data) => {
        this.cartCount = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
