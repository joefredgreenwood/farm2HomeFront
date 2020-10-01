import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';
// import { newArray } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  rootURL: string;

  constructor(private httpsvc: HttpClient) { 
    this.rootURL="http://localhost:7777/farmtoshop/customer"
  }


  getCustomer():Observable<Customer[]>{
    return this.httpsvc.get<Customer[]>(this.rootURL+"/list")
  }

  findCustomerByID(customerID:number):Observable<Customer>{
    return this.httpsvc.get<Customer>(this.rootURL+"/find/"+customerID)
  }

findCustomerByUsername(customerUsername:string, customerPassword:string):Observable<Customer>{
  return this.httpsvc.get<Customer>(this.rootURL+"/findu/"+customerUsername+"/"+customerPassword)
}

  createCustomer(newCustomer:Customer):Observable<Customer>{
  
    var contentData= "customerForename="+newCustomer.customerForename+
                "&customerSurname="+newCustomer.customerSurname+
                "&customerAddress="+newCustomer.customerAddress+
                "&customerDOB="+newCustomer.customerDOB+
                "&customerEmail="+newCustomer.customerEmail+
                "&customerUsername="+newCustomer.customerUsername+
                "&customerPassword="+newCustomer.customerPassword
    
                const httpOptions= {
                  headers: new HttpHeaders(
                  {"Content-Type":"application/x-www-form-urlencoded"})
                  }
                  return this.httpsvc.post<Customer>(
                  this.rootURL+"/register/", //url
                  contentData, //data for the server
                  httpOptions) //header options
                  
                  }
    
  

}
