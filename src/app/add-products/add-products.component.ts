import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryComponent } from './../category/category.component';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent extends CategoryComponent implements OnInit {
  addProductForm: FormGroup;
  selectedImage: any;
  fd: FormData = new FormData();
  constructor(
    public override pdtSer: ProductsService,
    public override snackBarSer: SnackbarService
  ) {
    super(pdtSer, snackBarSer);
  }
  override ngOnInit(): void {
    super.getCategory();
    this.addProductForm = new FormGroup({
      pdtCatId: new FormControl('', Validators.required),
      pdtName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      pdtPrice: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      pdtDesc: new FormControl(null),
      pdtImg: new FormControl(null, Validators.required),
    });
  }
  getImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.selectedImage = input.files[0];
  }
  doAddProducts() {
    this.fd.append('pdtCatId', this.addProductForm.get('pdtCatId').value);
    this.fd.append('pdtName', this.addProductForm.get('pdtName').value);
    this.fd.append('pdtPrice', this.addProductForm.get('pdtPrice').value);
    this.fd.append('pdtDesc', this.addProductForm.get('pdtDesc').value);
    this.fd.append('pdtImg', this.selectedImage);
    this.pdtSer.addProduct(this.fd).subscribe({
      next: (res) => {
        this.snackBarSer.openSnackBar(res, 'success');
        this.addProductForm.reset();
      },
      error: () => {
        this.snackBarSer.openSnackBar('Something went wrong', 'failure');
      },
    });
  }
}
