import { SnackbarService } from './../snackbar.service';
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
  productList: any[] = [];
  totalAmount: number = 0;
  constructor(
    public userSer: UsersService,
    public myRouter: Router,
    public pdtSer: ProductsService,
    public snackBarSer: SnackbarService
  ) {}
  ngOnInit(): void {
    this.userSer.getMyCartItem().subscribe({
      next: (data: any[]) => {
        console.log(data);
        this.productList = data;
        this.productList.forEach((obj) => {
          this.totalAmount += obj.cartPdtPrice;
        });
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
        this.myRouter.navigateByUrl('/');
      },
    });
  }
  doRemove(productId: number) {
    this.pdtSer.removeCart(productId).subscribe({
      next: (res) => {
        this.pdtSer.cartCount.next('emited');
        this.snackBarSer.openSnackBar('res', 'success');
        this.productList = this.productList.filter((obj) => {
          return productId != obj._id;
        });
        this.totalAmount = 0;
        this.productList.forEach((obj) => {
          this.totalAmount += obj.cartPdtPrice;
        });
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
  updateCart(cartPdtId: number, cartPdtQty: number, pdtPrice: number) {
    if (cartPdtQty === 0) {
      this.snackBarSer.openSnackBar('Not able to add negative product', 'info');
      return;
    }
    this.pdtSer
      .updateCart({
        cartId: cartPdtId,
        cartPdtQty: cartPdtQty,
        pdtPrice: pdtPrice,
      })
      .subscribe({
        next: (data) => {
          const index = this.productList.findIndex((obj) => {
            return obj._id === cartPdtId;
          });
          this.productList[index].cartPdtQty = cartPdtQty;
          this.productList[index].cartPdtPrice = cartPdtQty * pdtPrice;
          this.totalAmount = 0;
          this.productList.forEach((obj) => {
            this.totalAmount += obj.cartPdtPrice;
          });
          this.snackBarSer.openSnackBar(data, 'success');
        },
        error: () => {
          this.snackBarSer.openSnackBar('Something went wrong', 'failure');
        },
      });
  }
}
