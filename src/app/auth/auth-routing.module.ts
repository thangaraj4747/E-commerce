import { ListproductsComponent } from './../Products/listproducts/listproducts.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from '../Products/add-products/add-products.component';
import { AuthGuard } from '../auth.guard';
import { ViewcartComponent } from '../viewcart/viewcart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'viewcart',
        component: ViewcartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-products',
        component: AddProductsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
