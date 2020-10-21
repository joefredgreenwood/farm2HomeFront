import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // customer: Customer[]  
  currentCustomer:Customer
  serverMessage: string
  createError:string
  doesCreateWork:boolean
  invalidInput:string
  inputIssue:boolean
//  constructor(private customerService:CustomerService) { 
//     this.customer=[]
//   }

  constructor(private customerService: CustomerService, private router:Router){
    this.inputIssue = true
    this.invalidInput=""
    this.doesCreateWork = true
    this.createError=""
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
    if((newCustomer.customerEmail.includes("@") == false) || (newCustomer.customerEmail.includes(".com")==false)){
      this.invalidInput = "Please enter a valid email"
      this.inputIssue = false
    }
    else{
    this.customerService.createCustomer(newCustomer).subscribe(
      response=>{
        this.invalidInput = ""
        this.inputIssue = true
        this.currentCustomer = response
         this.fetchCustomerFromServer()
          this.createError="Thank you for making an account, please head to customer logIn to see your basket"
          this.doesCreateWork = false
          sessionStorage.setItem("customerUsername", this.currentCustomer.customerUsername)
          sessionStorage.setItem("customerPassword",this.currentCustomer.customerPassword)
          this.router.navigate(["customer-log-in"])
        
              },
      error=>{
        this.inputIssue = true
        this.doesCreateWork = false
        this.createError = "This username already exists please choose another one"
      }
    )
    }
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
