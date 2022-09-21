import { UsersService } from './../../users.service';
import { SnackbarService } from './../../snackbar.service';
import { SpinnerService } from './../../spinner.service';
import { ProductsService } from './../../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPdtDetails } from './products.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss'],
})
export class ListproductsComponent implements OnInit {
  productLists: IPdtDetails[] = [];
  toggleImage: boolean = true;
  myParamSubscribe: Subscription;
  constructor(
    public pdtSer: ProductsService,
    public userSer: UsersService,
    public spinnerSer: SpinnerService,
    public aRoute: ActivatedRoute,
    public snackBarSer: SnackbarService,
    public myRouter: Router
  ) {}

  ngOnInit(): void {
    this.myParamSubscribe = this.aRoute.params.subscribe({
      next: (params: Params) => {
        if (params['catid']) {
          this.getPdtCatwise(params['catid']);
          return;
        }
        this.getProductByList();
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
  getProductByList() {
    this.pdtSer.getProductList().subscribe({
      next: (res: IPdtDetails[]) => {
        this.productLists = res;
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
  getPdtCatwise(catid: string) {
    this.pdtSer.getPdtCatwise(catid).subscribe({
      next: (data: IPdtDetails[]) => {
        this.productLists = data;
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
  addToCarrt(id: number, price: number) {
    this.pdtSer
      .addToCart({
        cartPdtId: id,
        cartPdtPrice: price,
      })
      .subscribe({
        next: (res) => {
          this.userSer.cartCount.next('emited');
          this.snackBarSer.openSnackBar(res, 'success');
        },
        error: (error) => {
          if (error.status === 401) {
            this.snackBarSer.openSnackBar(
              'Please Login Using Your Credential',
              'failure'
            );
            this.myRouter.navigateByUrl('/login');
            localStorage.clear();
            return;
          }
          if (error.status === 409) {
            this.snackBarSer.openSnackBar(
              'Selected product already added your cart. Plese check your cart items',
              'failure'
            );
            return;
          }
          this.snackBarSer.openSnackBar('Something went wrong', 'failure');
        },
      });
  }
  toggleImages() {
    this.toggleImage = !this.toggleImage;
  }
  ngOnDestroy(): void {
    this.myParamSubscribe.unsubscribe();
  }
}
