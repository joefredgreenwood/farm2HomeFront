import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { Basket } from '../basket';
import { AssignedProduct } from '../assigned-product';
import { Product } from '../product';
import { FarmService } from '../farm.service';

@Component({
  selector: 'app-customer-log-in',
  templateUrl: './customer-log-in.component.html',
  styleUrls: ['./customer-log-in.component.css']
})
export class CustomerLogInComponent implements OnInit {
  assignedProduct:AssignedProduct
  customer:Customer
  currentProduct:Product
  currentBasket:Basket
  aProd:AssignedProduct[]
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
    this.currentBasket={
      basketID: 0,
      basketValue:0.0
    }
    this.aProd=[{
      assignedProductID:0,
      productQuantity:0
    }]
    this.assignedProduct={
      assignedProductID:0,
      productQuantity:0
    }
   }


   fetchCustomer(){
     this.customerService.findCustomerByUsername(this.customer.customerUsername, this.customer.customerPassword).subscribe(
       Response=>{
         this.isApplicantValid = true
         this.customer=Response
         this.serverIssue = ""
         this.hasCustomerData = true
         this.fetchBasket()
         sessionStorage.setItem("customerUsername",this.customer.customerUsername)
         sessionStorage.setItem("customerPassword",this.customer.customerPassword)
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



   fetchBasket() {
     this.customerService.findBasketByUsernameAndPassword(this.customer.customerUsername, this.customer.customerPassword).subscribe(
       response=>{
         this.currentBasket = response
         this.fetchAprod()
       }
     )
   }

   fetchAprod(){
     this.customerService.findAssignedProd(this.currentBasket.basketID).subscribe(
       response=>{
         this.aProd = response
         this.aProd.forEach(assignedProduct => {
          this.assignedProduct = assignedProduct 
          this.fetchProd()
         });
       }
     )
   }

   fetchProd(){
     this.customerService.findProd(this.assignedProduct.assignedProductID).subscribe(
      response=>{
        this.currentProduct = response
      }
     )
   }

   toggleIsCustomerEditingForm(){
     this.isCustomerEditing=!this.isCustomerEditing
     this.fetchCustomer()
   }


  ngOnInit(): void{
    var username = sessionStorage.getItem("customerUsername")
    var password = sessionStorage.getItem("customerPassword")
    if(username!=="" || password!=="")
    this.customer.customerUsername=username
    this.customer.customerPassword=password
    this.fetchCustomer()
  }

}
