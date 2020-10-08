import { Component, OnInit } from '@angular/core';
import { Farm } from '../farm';
import { FarmService } from '../farm.service';
import { Product } from '../product';

@Component({
  selector: 'app-farm-log-in',
  templateUrl: './farm-log-in.component.html',
  styleUrls: ['./farm-log-in.component.css']
})
export class FarmLogInComponent implements OnInit {

  farm: Farm
  currentProduct:Product[]
  serverIssue: string
  isFarmValid: boolean
  isFarmEditing: boolean
  hasFarmData: boolean
  isAccountEditing: boolean
 

  constructor(private farmService:FarmService) {
    this.isFarmValid = true
    this.isFarmEditing = false
    this.hasFarmData = false
    this.serverIssue=""
    this.isAccountEditing=true
    this.farm={
      farmID: 0,
      farmName: "Test",
      farmLocation: "Test1",
      farmType: "Test2",
      farmUsername: "",
      farmPassword: ""
    }
    this.currentProduct=[{
      productID:0,
      productName:"No Upload",
      productPrice:0.0,
      productQuantity:0
      
    }]
   }

   fetchFarm() {
     this.farmService.findFarmByUsername(this.farm.farmUsername, this.farm.farmPassword).subscribe(
       Response=>{
         this.isFarmValid = true
         this.farm = Response
         this.serverIssue = ""
         this.hasFarmData = true
         this.fetchProducts()
         
       },
       error => {
         this.hasFarmData = false
         console.log(error)
         this.serverIssue = "No account found with this username "+this.farm.farmUsername+" and password"
         this.isFarmValid = false
         this.farm={
          farmID: 0,
          farmName: "Test",
          farmLocation: "Test1",
          farmType: "Test2",
          farmUsername: "",
          farmPassword: ""
         }
       }
     )
   }

   fetchProducts(){
     this.farmService.findProducts(this.farm.farmUsername, this.farm.farmPassword).subscribe(
       response=>{
         this.currentProduct = response
       }

     )
   }

   addProducts(newProduct:Product){
     this.farmService.addProduct(this.farm.farmID, newProduct).subscribe(
       response=>{
         this.fetchProducts()
          this.isAccountEditing=true
          console.log()
       }
     )
   }

   toggleIsFarmEditingForm() {
     this.isFarmEditing=!this.isFarmEditing
     this.fetchFarm()
   }

   toggleIsAccountEditing(){
     this.isAccountEditing=!this.isAccountEditing
     this.fetchProducts()
   }

  ngOnInit(): void{
    this.fetchFarm
  }

}
