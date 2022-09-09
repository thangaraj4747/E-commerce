import { ProductsService } from './../products.service';
import { Router } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss'],
})
export class ViewcartComponent implements OnInit {
  totalAmount: number = 0;
  constructor(
    public userSer: UsersService,
    public myRouter: Router,
    public pdtSer: ProductsService
  ) {}
  productList: any[] = [];
  ngOnInit(): void {
    this.userSer.getMyCartItem().subscribe({
      next: (data: any[]) => {
        this.productList = data;
        this.productList.forEach((value) => {
          this.totalAmount += value.cartPdtPrice;
        });
      },
      error: (err) => {
        console.log(err);
        this.myRouter.navigateByUrl('/');
      },
    });
  }
  doRemove(productId: number) {
    this.pdtSer.removeCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.pdtSer.cartCount.next('emited');
        this.productList = this.productList.filter((value) => {
          return productId != value._id;
        });
        this.totalAmount = 0;
        this.productList.forEach((value) => {
          this.totalAmount += value.cartPdtPrice;
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
