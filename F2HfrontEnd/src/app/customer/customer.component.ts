import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // customer: Customer[]  
  currentCustomer:Customer
  serverMessage: string

//  constructor(private customerService:CustomerService) { 
//     this.customer=[]
//   }

  constructor(private customerService: CustomerService){
    this.currentCustomer={
      customerID: 0,
      customerForename: "string",
      customerSurname: "string",
      customerAddress: "string",
      customerDOB: "string",
      customerEmail: "string",
      customerUsername: "string",
      customerPassword: "string"
    }
  }

  createCustomer(newCustomer:Customer){
    this.customerService.createCustomer(newCustomer).subscribe(
      response=>{
         this.fetchCustomerFromServer()

              }
    )
  }

  fetchCustomerFromServer(){
    this.customerService.findCustomerByID(this.currentCustomer.customerID).subscribe(
      response =>{
        this.currentCustomer = response
      },
      error =>{
        console.log(error)
        this.serverMessage="noCustomerFound"
        this.currentCustomer={
          customerID: 0,
          customerAddress: "Test",
          customerDOB: "Test1",
          customerEmail: "Test2",
          customerForename: "Test3",
          customerPassword: "Test4",
          customerSurname: "Test5",
          customerUsername: "Test6"
        }

      }
    )
  }

  ngOnInit() {
    // this.customerService.getCustomer().subscribe(
    //   res=>{this.customer=res}
    // )
  }

}