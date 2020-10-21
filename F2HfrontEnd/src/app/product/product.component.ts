import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Customer } from '../customer';
import { AssignedProduct } from '../assigned-product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  aprod:AssignedProduct
  prod:Product[]
  product:Product
  customer:Customer
  serverIssue:string
  isApplicantValid: boolean
  isCustomerEditing: boolean
  hasCustomerData: boolean
  customerID: number
  buyIssue: string
  isThereIssue: boolean
  isLoggedIn: boolean
  

  constructor(private prodServices:ProductService, private router:Router) {
    this.isThereIssue = true
    this.isLoggedIn = false
    this.buyIssue = ""
    this.isApplicantValid = true
    this.isCustomerEditing = false
    this.hasCustomerData = false
    this.serverIssue=""
    this.customerID=0
    this.prod=[{
      productID:0,
      productName:"",
      productPrice:0,
      productQuantity:0,
      remainQuantity:0
    }]
    this.product={
      productID:0,
      productName:"",
      productPrice:0,
      productQuantity:0,
      remainQuantity:0
    }
    this.customer={
      customerID:0,
      customerAddress:"",
      customerDOB:"",
      customerEmail:"",
      customerForename:"",
      customerPassword:"",
      customerSurname:"",
      customerUsername:""
    }
    this.aprod={
      assignedProductID:0,
      productQuantity:0,
    }
   }
   fetchAllProducts(){
     this.prodServices.findAllProducts().subscribe(
       Response=>
       {this.prod=Response
      }
     )
       
     
   }


   buyThings(productQuantity:number, productID:number){
     this.prodServices.buyProducts(productQuantity, productID, this.customerID).subscribe(
       response=>{
         this.aprod = response
         this.isThereIssue=false
         this.buyIssue="Item has been succesfully added to basket"
         this.fetchAllProducts()
         this.router.navigate(["customer-log-in"])
       },
       error=>{
         this.isThereIssue=false
         this.buyIssue="Please enter a quantity less than or equal to the remaining quantity"
         this.fetchAllProducts()
       }
     )
   }

  //  setProd(){
  //   this.pro
  // }


   fetchCustomer(){
    this.prodServices.findCustomerByUsername(this.customer.customerUsername, this.customer.customerPassword).subscribe(
      Response=>{
        this.isApplicantValid = true
        this.isLoggedIn = true
        this.customer = Response
        this.serverIssue = ""
        this.hasCustomerData = true
        this.customerID = this.customer.customerID
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

  toggleIsCustomerEditingForm(){
    this.isCustomerEditing=!this.isCustomerEditing
    this.fetchCustomer()
  }

  

  ngOnInit() {
    var username = sessionStorage.getItem("customerUsername")
    var password = sessionStorage.getItem("customerPassword")
    if(username!=="" || password!=="")
    this.customer.customerUsername=username
    this.customer.customerPassword=password
    this.fetchCustomer()
    this.fetchAllProducts()
  }

}
