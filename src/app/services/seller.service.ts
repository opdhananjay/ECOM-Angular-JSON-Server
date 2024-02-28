import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {



  constructor(private http:HttpClient,private Route:Router) { }

  isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  userSignUp(data:signup){
      let res =  this.http.post("http://localhost:3000/Sellers",data,{observe:"response"}).subscribe((res)=>{
        this.isLoggedIn.next(true)
        localStorage.setItem("seller",JSON.stringify(res.body))
        this.Route.navigate(["seller-home"])
      });
      return false
  }

  reloadSeller(){
    if(localStorage.getItem("seller")){
      this.isLoggedIn.next(true)
      this.Route.navigate(["seller-home"])
    }
  }


  userLogin(data:login){
    
  console.log("Service data",(data.email))
    this.http.get(`http://localhost:3000/Sellers?email=${data.email}&password=${data.password}`,{observe:"response"}).subscribe((res:any)=>{
      console.log("sub",res)
      if(res && res.body && res.body.length){
        localStorage.setItem("seller",JSON.stringify(res.body))
        this.Route.navigate(["seller-home"])
      }else{
        this.isLoginError.emit(true)
        console.log("faild")
      }
    })
  }


}
