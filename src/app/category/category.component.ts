import { ICategory } from './../Products/listproducts/products.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(public pdtSer: ProductsService) {}
  categoryList: ICategory[];
  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.pdtSer.getCategory().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
