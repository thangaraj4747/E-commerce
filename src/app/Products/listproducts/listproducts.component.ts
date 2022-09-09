import { SpinnerService } from './../../spinner.service';
import { ProductsService } from './../../products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss'],
})
export class ListproductsComponent implements OnInit {
  productLists: any[] = [];

  constructor(
    public pdtSer: ProductsService,
    public spinnerSer: SpinnerService,
    public aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pdtSer.getProductList().subscribe({
      next: (res) => {
        this.productLists = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.aRoute.params.subscribe({
      next: (params: Params) => {
        this.getPdtCatwise(params['catid']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getPdtCatwise(catid: string) {
    this.pdtSer.getPdtCatwise(catid).subscribe({
      next: (data) => {
        this.productLists = data;
      },
      error: (error) => {
        console.log(error);
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
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
