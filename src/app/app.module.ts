import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { ServicesComponent } from './services/services.component';
import { ShortCodesComponent } from './short-codes/short-codes.component';
import { FaqsComponent } from './policy-info/faqs/faqs.component';
import { PrivacyComponent } from './policy-info/privacy/privacy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpinterceptorService } from './httpinterceptor.service';
import { AddProductsComponent } from './add-products/add-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    NewsletterComponent,
    BreadcrumbComponent,
    ListproductsComponent,
    LoginComponent,
    NotfoundComponent,
    AboutComponent,
    EventsComponent,
    ServicesComponent,
    ShortCodesComponent,
    FaqsComponent,
    PrivacyComponent,
    ViewcartComponent,
    SpinnerComponent,
    AddProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
