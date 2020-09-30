import { Component, OnInit } from '@angular/core';
import { Basket } from '../basket';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  currentBasket:Basket
  serverMessage: string

  constructor(private basketService: BasketService){
    this.currentBasket={
      basketID: 0,
      basketValue: 1
    }
  }

    createBasket(newBasket:Basket){
      this.basketService.createBasket(newBasket).subscribe(
        response=>{
          this.fetchBasketFromServer()
        }
      )
    }
    fetchBasketFromServer(){
      this.basketService.findBasketByID(this.currentBasket.basketID).subscribe(
        response =>{
          this.currentBasket = response
        },
        error =>{
          console.log(error)
          this.serverMessage="noBasketFound"
          this.currentBasket={
            basketID: 0,
            basketValue: 1
          }
        }
      )
      }


  

  ngOnInit() {
  }

}
