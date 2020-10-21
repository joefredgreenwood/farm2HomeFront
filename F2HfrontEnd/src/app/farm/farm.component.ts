import { Component, OnInit } from '@angular/core';
import { Farm } from '../farm';
import { FarmService } from '../farm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  currentFarm: Farm
  serverMessage: string
  doesCreateWork: boolean
  createError: string

  public show: boolean=false;
  public farmSignUp:any = 'Show';

  constructor(private farmerService: FarmService, private router:Router) {
    this.doesCreateWork = true
    this.createError = ""
    this.currentFarm={
      farmID: 0,
      farmName: "string",
      farmLocation: "string",
      farmType: "string",
      farmUsername: "string",
      farmPassword: "string"
    }
   }

   createFarm(newFarm:Farm){
     this.farmerService.createFarm(newFarm).subscribe(
       response=>{
         this.currentFarm = response
         this.doesCreateWork = false
         this.createError = "You have succesfuly signed up"
         this.fetchFarmFromServer()
         this.createError=""
         this.doesCreateWork=true
         sessionStorage.setItem("farmUsername", this.currentFarm.farmUsername)
         sessionStorage.setItem("farmPassword", this.currentFarm.farmPassword)
         this.router.navigate(["farm-log-in"])
       },
       error=>{
        this.doesCreateWork = false
        this.createError = "This username already exists please choose another one"
      }
     )
   }

   fetchFarmFromServer(){
     this.farmerService.findFarmByID(this.currentFarm.farmID).subscribe(
       response =>{
         this.currentFarm = response
       },
       error =>{
         console.log(error)
         this.serverMessage="no Farm found"
         this.currentFarm={
           farmID: 0,
           farmName: "Test",
           farmLocation: "Test1",
           farmType: "Test2",
           farmUsername: "Test3",
           farmPassword: "Test4"
         }
       }
     )
   }

  toggle() {
    this.show = !this.show;

    if(this.show)
      this.farmSignUp = "Hide";
    else
      this.farmSignUp = "Show";
  }


  ngOnInit() {
  }

}
