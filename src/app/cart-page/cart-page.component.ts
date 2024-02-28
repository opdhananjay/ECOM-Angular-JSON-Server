import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {


cartData:cart[] |undefined;
priceSummary:priceSummary= {
  price:0,
  discount:0,
  tax:0,
  delivery:0,
  total:0
}


  constructor(private product:ProductService,private rouet:Router){}

ngOnInit(){
  this.loadCartDetailsCheck()
}


loadCartDetailsCheck(){
  this.product.currentCart().subscribe((res)=>{
    console.log("current cart",res)
    this.cartData = res

    // for loop to calculate price:
      if(this.cartData){
        let price = 0
        let qty = 1
          for(let i=0;i<=this.cartData.length-1;i++){
           
            price =(price +  parseFloat(this.cartData[i].price))*this.cartData[i].quantity
            console.log(price)
        }


         this.priceSummary.price = price 


         this.priceSummary.discount = price/10;
         this.priceSummary.tax = price/10;
         this.priceSummary.delivery =price/10
         this.priceSummary.total = (price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery)

         if(!this.cartData.length){
          this.rouet.navigate(["/"])
          alert("no carts")
         }
    }
  })
}



checkout(){
  this.rouet.navigate(["/checkout"])
}



removeToCart(cartId:number|undefined){
    if(cartId){
    cartId && this.product.removeToCart(cartId).subscribe((res)=>{
      this.loadCartDetailsCheck()
    })
  }
}



}
