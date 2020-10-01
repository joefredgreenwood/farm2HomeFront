import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

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

}
