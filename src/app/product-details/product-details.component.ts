import { Component, IterableDiffers } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, cart, } from '../data-type';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: Product | undefined
  productQty: Number | any = 1
  removeCart: boolean = false
  id: number = 0
  cartDataFor: any
  cartData:Product|undefined
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit() {

    let pid = this.route.snapshot.paramMap.get("productId")
    if (pid) {
      this.id = +pid
      pid && this.product.getProduct(pid).subscribe((res) => {
        this.productData = res
        
      })
    }



    // checking for exisitance of product in localstorge 
    let cartData = localStorage.getItem("localCart");

    if (cartData && pid) {
      let items = JSON.parse(cartData)
      items = items.filter((item: Product) => pid == item.id.toString())
      if (items.length) {
        this.removeCart = true
      } else {
        this.removeCart = false
      }
    }

    let user = localStorage.getItem("user")
    if (user) {
      let userId = user && JSON.parse(user).id
      this.product.getCartList(userId);
      this.product.cartData.subscribe((result) => {
        console.log("result", result)
        let item = result.filter((item: Product) => pid?.toString() == item.productId?.toString())
        console.log("item", item)
        if (item.length) {
          this.cartData = item[0]
          this.removeCart = true
        } else {

        }

      })


    }
    // checking for exisitance of product in localstorge 




  }



  minus() {
    if (this.productQty > 1) {
      this.productQty = this.productQty - 1
    }
  }
  plus() {
    if (this.productQty < 20) {
      this.productQty = this.productQty + 1
    }
  }


  addToCart() {

    if (this.productData) {
      this.productData.quantity = this.productQty

      if (!localStorage.getItem("user")) {
        // addding locally data usin service   when user is not loggded
        this.product.localAddToCart(this.productData)



        //if user click on add to cart diaply option remove to cart
        this.removeCart = true

      } else {
        console.log("User logged")

        let user = localStorage.getItem("user")
        let userId = user && JSON.parse(user).id

        let cartData: cart = {
          ...this.productData, userId,
          productId: this.productData.id
        }

        // delete product id -  
        delete cartData.id
        console.warn(cartData)

        //calling api for adding into database  - - -
        this.product.addToCart(cartData).subscribe((result) => {
          console.log("result", result)
          if (result) {
            // alert("Product is Added in Cart Succefully..") 
            this.product.getCartList(userId);
            this.removeCart = true

          }

        })
      }

    }

  }

  // For Local storage -
  removeToCart(productId: number) {

    if (!localStorage.getItem("user")) {
    if (productId) {
      this.product.removeItemFromCart(productId)
    }
  }else {

    console.log("removetoncart",this.cartData)
    }

    //remove cart after login -

    let user = localStorage.getItem("user")
    let userId = user && JSON.parse(user).id

    this.cartData && this.product.removeToCart(this.cartData?.id).subscribe((res)=>{
      if(res){
        this.product.getCartList(userId)
      }
    })
    this.removeCart = false



  }




}









