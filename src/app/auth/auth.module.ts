import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AddProductsComponent } from '../add-products/add-products.component';
import { ViewcartComponent } from '../viewcart/viewcart.component';

@NgModule({
  declarations: [ViewcartComponent, AddProductsComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
