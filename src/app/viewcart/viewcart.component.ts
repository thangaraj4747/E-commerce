import { SnackbarService } from './../snackbar.service';
import { ProductsService } from './../products.service';
import { Router } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { IViewCart } from '../Products/listproducts/products.model';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss'],
})
export class ViewcartComponent implements OnInit {
  productList: IViewCart[] = [];
  totalAmount: number = 0;
  constructor(
    public userSer: UsersService,
    public myRouter: Router,
    public pdtSer: ProductsService,
    public snackBarSer: SnackbarService
  ) {}
  ngOnInit(): void {
    this.userSer.getMyCartItem().subscribe({
      next: (data: IViewCart[]) => {
        this.productList = data;
        this.productList.forEach((obj) => {
          this.totalAmount += obj.orderdetails[0].productPrice;
        });
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
        this.myRouter.navigateByUrl('/login');
        localStorage.clear();
      },
    });
  }
  doRemove(productId: number) {
    this.pdtSer.removeCart(productId).subscribe({
      next: (res: string) => {
        this.userSer.cartCount.next('emited');
        this.snackBarSer.openSnackBar(res, 'success');
        this.productList = this.productList.filter((obj) => {
          return obj._id != productId;
        });
        this.totalAmount = 0;
        this.productList.forEach((obj) => {
          this.totalAmount += obj.orderdetails[0].productPrice;
        });
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
  updateCart(cartPdtId: number, cartQty: number, pdtPrice: number) {
    if (cartQty === 0) {
      this.snackBarSer.openSnackBar('Not able to add negative product', 'info');
      return;
    }
    this.pdtSer
      .updateCart({
        cartId: cartPdtId,
        cartQty: cartQty,
        pdtPrice: pdtPrice,
      })
      .subscribe({
        next: (data: string) => {
          const index = this.productList.findIndex((obj) => {
            return obj._id === cartPdtId;
          });
          this.productList[index].cartQty = cartQty;
          this.productList[index].orderdetails[0].productPrice = cartQty * pdtPrice;
          this.totalAmount = 0;
          this.productList.forEach((obj) => {
            this.totalAmount += obj.orderdetails[0].productPrice;
          });
          this.snackBarSer.openSnackBar(data, 'success');
        },
        error: () => {
          this.snackBarSer.openSnackBar('Something went wrong', 'failure');
        },
      });
  }
}
