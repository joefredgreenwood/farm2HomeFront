import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FarmComponent } from './farm/farm.component';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerLogInComponent } from './customer-log-in/customer-log-in.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ProductComponent } from './product/product.component';
import { FarmProductComponent } from './farm-product/farm-product.component';
import { FarmLogInComponent } from './farm-log-in/farm-log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    FarmComponent,
    BasketComponent,
    HomeComponent,
    CustomerLogInComponent,
    CustomerProfileComponent,
    ProductComponent,
    FarmProductComponent,
    FarmLogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
