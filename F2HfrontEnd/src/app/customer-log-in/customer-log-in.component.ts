import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-log-in',
  templateUrl: './customer-log-in.component.html',
  styleUrls: ['./customer-log-in.component.css']
})
export class CustomerLogInComponent implements OnInit {

  customer:Customer
  serverIssue:string
  isApplicantValid: boolean
  isCustomerEditing: boolean
  hasCustomerData: boolean

  constructor(private customerService:CustomerService) {
    this.isApplicantValid = true
    this.isCustomerEditing = false
    this.hasCustomerData = false
    this.serverIssue=""
    this.customer={
      customerID: 0,
      customerForename: "string",
      customerSurname: "string",
      customerAddress: "string",
      customerDOB: "string",
      customerEmail: "string",
      customerUsername: "",
      customerPassword: ""
    }
   }


   fetchCustomer(){
     this.customerService.findCustomerByUsername(this.customer.customerUsername, this.customer.customerPassword).subscribe(
       Response=>{
         this.isApplicantValid = true
         this.customer = Response
         this.serverIssue = ""
         this.hasCustomerData = true
       },
       error =>{
         this.hasCustomerData = false
         console.log(error)
         this.serverIssue = "No account found with this username "+this.customer.customerUsername+" and password"
         this.isApplicantValid = false
         this.customer={
          customerID: 0,
          customerForename: "string",
          customerSurname: "string",
          customerAddress: "string",
          customerDOB: "string",
          customerEmail: "string",
          customerUsername: "",
          customerPassword: ""
         }
       }
      
       
     )
   }

   toggleIsCustomerEditingForm(){
     this.isCustomerEditing=!this.isCustomerEditing
     this.fetchCustomer()
   }


  ngOnInit(): void{
    this.fetchCustomer
  }

}
