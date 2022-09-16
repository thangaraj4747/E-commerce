import { AddProductsComponent } from './add-products/add-products.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FaqsComponent } from './policy-info/faqs/faqs.component';
import { PrivacyComponent } from './policy-info/privacy/privacy.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { ServicesComponent } from './services/services.component';
import { ShortCodesComponent } from './short-codes/short-codes.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: ListproductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'short-codes', component: ShortCodesComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'viewcart',
    component: ViewcartComponent,
    canActivate: [AuthGuard],
  },
  { path: 'category', redirectTo: '/', pathMatch: 'full' },
  { path: 'category/:catid', component: ListproductsComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
