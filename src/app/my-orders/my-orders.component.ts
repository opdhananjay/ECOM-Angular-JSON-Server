import { Component } from '@angular/core';
import { Product, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

orderData:order[] | undefined

constructor(private product:ProductService){}

ngOnInit(){
this.getOrderList()
}

cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((res)=>{
      this.getOrderList()
    })
}

getOrderList()
{
  this.product.orderList().subscribe((res)=>{
    this.orderData = res
 })

}
}
