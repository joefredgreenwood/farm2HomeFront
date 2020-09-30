import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Basket } from './basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  rootURL: string;

  constructor(private httpsvc: HttpClient) {
    this.rootURL="http://localhost:7777/farmtoshop/basket"
  }

  getBasket():Observable<Basket[]>{
    return this.httpsvc.get<Basket[]>(this.rootURL+"/list")
  }

  findBasketByID
  (basketID:number):Observable<Basket>{
    return this.httpsvc.get<Basket>(this.rootURL+"/find/"+basketID)
  }

  createBasket(newBasket:Basket):Observable<Basket>{

    var contentData="basketValue="+newBasket.basketValue
    
      const httpOptions= {
        headers: new HttpHeaders(
        {"Content-Type":"application/x-www-form-urlencoded"})
      }
        return this.httpsvc.post<Basket>(
        this.rootURL+"/register/", //url
        contentData, //data for the server
        httpOptions) //header options
    }
    
}
