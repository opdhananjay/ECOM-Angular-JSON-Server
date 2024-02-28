import { Component } from '@angular/core';
import { Product, cart, login, signup } from '../data-type';
import { UserService } from '../services/user.service';
import { fa0 } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {


  loggedUserId!:number
  constructor(private user:UserService,private product:ProductService){}


  ngOnInit(){
    this.user.userAuthReload();
    
  }

  signUp(data:signup){

    this.user.userSignup(data)
      
  }

  show:boolean= false
  authError:string | undefined

  openLogin(){
    this.show = true
  }


  openSignUp(){
    this.show = false
  }

  login(val:login){
    console.log(val)
    this.user.userLogin(val)
    
    this.user.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError =  "user email or pass is wrong"

      }else{
        this.localCartToRemoteCart()
       
      }
    })

    setTimeout(() => {
        this.authError =undefined
    }, 2000);

  }


  

  localCartToRemoteCart(){

      let data = localStorage.getItem("localCart")

      let user = localStorage.getItem("user")
      let userId = user && JSON.parse(user).id
      this.loggedUserId = userId

      if(data){
        
        let cartDataList:Product[] = JSON.parse(data) 
      

        cartDataList.forEach((product:Product,index)=>{

            let cartData:cart = {
              ...product,
              productId:product.id,
              userId
            }
            
            delete cartData.id  // we are deleting beacuase cart make id automatically that we dont want
            

            // we are setting timeout because json server cannont handle so fast
            setTimeout(() => {

              this.product.addToCart(cartData).subscribe((result)=>{
                console.log("result",result)
                if(result){
                  console.log("Product is Added in Cart Succefully..") 
                 }
              })


              // this is suppose 3 item in localstorage after calling settimeout we will get index so if completed then it will return 3  if 3==3 then remove localstorage 
              if(cartDataList.length==index+1){
                localStorage.removeItem("localCart")
              }
              
            }, 1500);
        });

  }

  // this is for
setTimeout(() => {

  console.log(this.loggedUserId)
  this.product.getCartList(this.loggedUserId)
  
}, 2000)

  

  }




}






