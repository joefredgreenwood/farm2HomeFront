import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  prod:Product[]

  constructor(private prodServices:ProductService) {
    this.prod=[]
   }
   fetchAllProducts(){
     this.prodServices.findAllProducts().subscribe(
       Response=>{this.prod=Response}
     )
       
     
   }


  ngOnInit() {
    this.fetchAllProducts()
  }

}
