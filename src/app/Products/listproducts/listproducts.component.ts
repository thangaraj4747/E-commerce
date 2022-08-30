import { ProductsService } from './../../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss'],
})
export class ListproductsComponent implements OnInit {
  productLists: any[] = [];

  constructor(public pdtSer: ProductsService) {}

  ngOnInit(): void {
    this.pdtSer.getProductList().subscribe({
      next: (res) => {
        this.productLists = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
