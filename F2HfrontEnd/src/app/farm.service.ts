import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farm } from './farm';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  rootURL: string

  constructor(private httpsvc: HttpClient) {
    this.rootURL="http://localhost:7777/farmtoshop/farm"
   }

   getFarm():Observable<Farm[]>{
     return this.httpsvc.get<Farm[]>(this.rootURL+"/list")
   }

   findFarmByID(farmID:number):Observable<Farm>{
     return this.httpsvc.get<Farm>(this.rootURL+"/find/"+farmID)
   }

  //  addProduct(farmUsername:string, farmPassword:string, newProduct:Product):Observable<Product>{
  //    var contentData = 
  //                     "farmUsername="+farmUsername+
  //                     "&farmPassword="+farmPassword+
  //                     "&productName="+newProduct.productName+
  //                     "&productPrice="+newProduct.productPrice+
  //                     "&productQuantity"+newProduct.productQuantity
  //   const httpOptions= {
  //   headers: new HttpHeaders(
  //   {"Content-Type":"application/x-www-form-urlencoded"})
  //                       }

  //   return this.httpsvc.post<Product>(this.rootURL+"/product/register", contentData, httpOptions)
  //                     }

  addProduct(farmID:number, newProduct:Product):Observable<Product>{
    var contentData = 
                     "farmID="+farmID+
                     "&productName="+newProduct.productName+
                     "&productPrice="+newProduct.productPrice+
                     "&productQuantity="+newProduct.productQuantity

   const httpOptions= {
   headers: new HttpHeaders(
   {"Content-Type":"application/x-www-form-urlencoded"})
                       }

   return this.httpsvc.post<Product>(this.rootURL+"/product/register", contentData, httpOptions)
                     }
   
    findProducts(farmUsername:string, farmPassword:string):Observable<Product[]>{
      return this.httpsvc.get<Product[]>(this.rootURL+"/product/findu/"+farmUsername+"/"+farmPassword)
    }

  //findApplicationFormByPassportNo(passportNo:number):Observable<Application[]>{
//   return this.httpSvc.get<Application[]>(this.serviceURL+"/applicationform/"+passportNo)
// }
   
     findFarmByUsername(farmUsername:string, farmPassword:string):Observable<Farm>{
     return this.httpsvc.get<Farm>(this.rootURL+"/findu/"+farmUsername+"/"+farmPassword)
   }

   createFarm(newFarm:Farm):Observable<Farm>{

    var contentData= "farmName="+newFarm.farmName+
                  "&farmLocation="+newFarm.farmLocation+
                  "&farmType="+newFarm.farmType+
                  "&farmUsername="+newFarm.farmUsername+
                  "&farmPassword="+newFarm.farmPassword

                  const httpOptions= {
                    headers: new HttpHeaders(
                      {"Content-Type":"application/x-www-form-urlencoded"})
                  }
                  return this.httpsvc.post<Farm>(
                    this.rootURL+"/register/", //URL
                    contentData, //data for the server
                    httpOptions) //header options
   }
}
