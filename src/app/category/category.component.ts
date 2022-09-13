import { SnackbarService } from './../snackbar.service';
import { ICategory } from './../Products/listproducts/products.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    public pdtSer: ProductsService,
    public snackBarSer: SnackbarService
  ) {}
  categoryList: ICategory[];
  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.pdtSer.getCategory().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
}
