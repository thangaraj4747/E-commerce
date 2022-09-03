import { SpinnerService } from './../../spinner.service';
import { ProductsService } from './../../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss'],
})
export class ListproductsComponent implements OnInit {
  productLists: any[] = [];

  constructor(
    public pdtSer: ProductsService,
    public spinnerSer: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerSer.isLoading.next(true);
    this.pdtSer.getProductList().subscribe({
      next: (res) => {
        this.spinnerSer.isLoading.next(false);
        this.productLists = res;
      },
      error: (error) => {
        this.spinnerSer.isLoading.next(false);
        console.log(error);
      },
    });
  }
}
