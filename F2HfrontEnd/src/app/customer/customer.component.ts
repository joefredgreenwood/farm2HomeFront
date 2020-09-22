import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer[]

  constructor(private customerService:CustomerService) { 
    this.customer=[]
  }

  createCustomer(newCustomer:Customer){
    this.customerService.createCustomer(newCustomer).subscribe(
      res=>{
        this.customerService.getCustomer().subscribe(
          res=>{this.customer=res}
        )
      }
    )
  }

  ngOnInit() {
    this.customerService.getCustomer().subscribe(
      res=>{this.customer=res}
    )
  }

}
