import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { CustomerLogInComponent } from './customer-log-in/customer-log-in.component';
import { FarmComponent } from './farm/farm.component';
import { ProductComponent } from './product/product.component';
import { FarmLogInComponent } from './farm-log-in/farm-log-in.component';


const routes: Routes = [

  {path:'home', component:HomeComponent},
  {path:'customer', component:CustomerComponent},
  {path:'basket', component:BasketComponent},
  {path:'customer-log-in', component:CustomerLogInComponent},
  {path:'farm', component:FarmComponent},
  {path:'farm-log-in', component:FarmLogInComponent},
  {path:'product', component:ProductComponent},
  {path:'',redirectTo:'/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
