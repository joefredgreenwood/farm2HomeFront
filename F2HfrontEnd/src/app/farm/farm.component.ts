import { Component, OnInit } from '@angular/core';
import { Farm } from '../farm';
import { FarmService } from '../farm.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  currentFarm: Farm
  serverMessage: string

  public show: boolean=false;
  public farmSignUp:any = 'Show';

  constructor(private farmerService: FarmService) {

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
         this.fetchFarmFromServer()
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
           farmPassword: "Test4",
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
