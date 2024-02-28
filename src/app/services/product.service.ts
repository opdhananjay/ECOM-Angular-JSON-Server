import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product, cart, order } from '../data-type';
import { subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  cartData = new EventEmitter<Product[] | []>();  // for updating cart data value 
  

  addProduct(data:Product){
   return this.http.post("http://localhost:3000/Products",data)
  }

  productList(){
    return this.http.get<Product[]>("http://localhost:3000/Products")
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }

  getProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/Products/${id}`)
  }

  updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:3000/Products/${product.id}`,product)
  }

  popularProduct(){
    return this.http.get<Product[]>(`http://localhost:3000/Products?_limit=3`)
  }

  trendyProduct(){
    return this.http.get<Product[]>("http://localhost:3000/Products?_limit=8")
  }

  searchproducts(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/Products?q=${query}`)
  }





  localAddToCart(data:Product){
    let cartData = []

    let localCart = localStorage.getItem("localCart")

    if(!localCart){
      // if localCart not exist then create it and push it
      localStorage.setItem("localCart",JSON.stringify([data]))
       this.cartData.emit([data])

    }else{
      //else convert it to string to array using parse and push data in it 
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem("localCart",JSON.stringify(cartData))
    }

    // Event emittier for live change value / have to subscribe in ts file
    this.cartData.emit(cartData)
  }


  removeItemFromCart(productId:number){

    let cartData = localStorage.getItem("localCart") 
    if(cartData){

      let items:Product[] = JSON.parse(cartData)

      items = items.filter((item:Product)=> productId!==item.id)
      
      console.log("click remove curent display remaining items",items)

      localStorage.setItem("localCart",JSON.stringify(items))
      
      this.cartData.emit(items)

    }
  }


  addToCart(cartData:cart){
   return this.http.post("http://localhost:3000/cart",cartData)
      
  }

  getCartList(userId:number){
    return this.http.get<Product[]>("http://localhost:3000/cart?userId="+userId,{observe:"response"}).subscribe((result)=>{
        if(result && result.body){
            console.log("user carts",result.body)
            this.cartData.emit(result.body)
        }
    })
  }


  removeToCart(cartId:number){
      return this.http.delete("http://localhost:3000/cart/"+cartId)
  }


  currentCart(){

    let user = localStorage.getItem("user")
    let userId = user && JSON.parse(user).id

    return this.http.get<cart[]>("http://localhost:3000/cart?userId="+userId)


  }


  orderNow(data:order){
    return this.http.post("http://localhost:3000/orders",data)
  }

  orderList(){
    let user = localStorage.getItem("user")
    let userId = user && JSON.parse(user).id
    return this.http.get<order[]>("http://localhost:3000/orders?userId="+userId)
  }

  deleteCartItems(cartId:number){
    return this.http.delete("http://localhost:3000/cart/"+cartId,{observe:"response"}).subscribe((res)=>{
        if(res){
          this.cartData.emit([])
        }
    })

  }




  cancelOrder(orderId:number){
      return this.http.delete("http://localhost:3000/orders/"+orderId)
  }

}
