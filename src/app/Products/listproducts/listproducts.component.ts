import { SnackbarService } from './../../snackbar.service';
import { SpinnerService } from './../../spinner.service';
import { ProductsService } from './../../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IPdtDetails } from './products.model';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss'],
})
export class ListproductsComponent implements OnInit {
  productLists: IPdtDetails[] = [];

  constructor(
    public pdtSer: ProductsService,
    public spinnerSer: SpinnerService,
    public aRoute: ActivatedRoute,
    public snackBarSer: SnackbarService
  ) {}

  ngOnInit(): void {
    this.pdtSer.getProductList().subscribe({
      next: (res) => {
        this.productLists = res;
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
    this.aRoute.params.subscribe({
      next: (params: Params) => {
        this.getPdtCatwise(params['catid']);
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
          this.pdtSer.cartCount.next('emited');
          this.snackBarSer.openSnackBar(res, 'success');
        },
        error: () => {
          this.snackBarSer.openSnackBar('Something went wrong', 'failure');
        },
      });
  }
}
