import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartData!: cart[] | undefined;
  totalPrice!:number

  orderMsg:string|undefined


  constructor(private product:ProductService,private router:Router){}

  ngOnInit(){
    this.product.currentCart().subscribe((res)=>{
     
      this.cartData = res
      // for loop to calculate price:
        if(this.cartData){
          let price = 0
          let qty = 1
            for(let i=0;i<=this.cartData.length-1;i++){
             
              price =(price +  parseFloat(this.cartData[i].price))*this.cartData[i].quantity
              console.log(price)
          }

          this.totalPrice = price+(price/10)+(price/10)-(price/10)
      }

    })
  }


  orderNow(data:{"email":string,"address":string,"contact":string}){
    console.log(data)
    let user = localStorage.getItem("user")
    let userId = user && JSON.parse(user).id

    if(userId){
      let orderData :order= {
        ...data,totalPrice:this.totalPrice,userId,id:undefined
      }


      // remove when click on checkout -- 

      this.cartData?.forEach((item:any)=>{
           setTimeout(() => {
            if(item.id){
                this.product.deleteCartItems(item.id)

            }
           }, 2000);
      })


      this.product.orderNow(orderData).subscribe((res)=>{
        console.log(res)
        if(res){
          this.orderMsg = "Your Order Has been placed"

        setTimeout(() => {
               this.router.navigate(["/myorders"])
               this.orderMsg = undefined
        }, 3000);
        }
      })
    }

  }




  



}
