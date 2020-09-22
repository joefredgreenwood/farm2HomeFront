import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  createCustomer(newCustomer:Customer):Observable<Customer>{
    const httpOpts ={
      headers:new HttpHeaders(
        {'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8'}
      )
    }

    var reqBody= "customerForename="+newCustomer.customerForename+
                "&customerSurname="+newCustomer.customerSurname+
                "&customerAddress="+newCustomer.customerAddress+
                "&customerDOB="+newCustomer.customerDOB+
                "&customerEmail="+newCustomer.customerEmail+
                "&customerUsername="+newCustomer.customerUsername+
                "&customerPassword="+newCustomer.customerPassword
    
    return this.httpsvc.post<Customer>(
      this.rootURL+"/register", reqBody,httpOpts
    )
  }

}
