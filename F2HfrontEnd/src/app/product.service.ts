import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Customer } from './customer';
import { AssignedProduct } from './assigned-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  rootURL: string;

  constructor(private httpsvc: HttpClient) { 
    this.rootURL="http://localhost:7777/farmtoshop/product"
  }

  findAllProducts():Observable<Product[]>{
    return this.httpsvc.get<Product[]>(this.rootURL+"/list")
  }

  findCustomerByUsername(customerUsername:string, customerPassword:string):Observable<Customer>{
    return this.httpsvc.get<Customer>("http://localhost:7777/farmtoshop/customer/findu/"+customerUsername+"/"+customerPassword)
  }

  buyProducts(assignedProduct:AssignedProduct, productID:number, customerID:number):Observable<AssignedProduct>{
    var contentData = 
              "customerID"+customerID+
              "&productID"+productID+
              "&productQuantity"+assignedProduct.productQuantity
    const httpOptions= {
    headers: new HttpHeaders(
    {"Content-Type":"application/x-www-form-urlencoded"})
                                    }
    return this.httpsvc.post<AssignedProduct>("http://localhost:7777/farmtoshop/customer/product/buy/", contentData, httpOptions)
  }

}
