import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }
  isLoginError = new EventEmitter<boolean>(false)
  

  userSignup(user:signup){
    return this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((res)=>{
      
      if(res){
        localStorage.setItem("user",JSON.stringify(res.body))
        this.router.navigate(["/"]);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem("user")){
      this.router.navigate(["/"])
    }
  }

  userLogin(data:login){  
      this.http.get<signup>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:"response"}).subscribe((res:any)=>{
        console.log(res)
        if(res && res.body && res.body.length){
            localStorage.setItem("user",JSON.stringify(res.body[0]))
            this.router.navigate(["/"]);
          this.isLoginError.emit(false)

        }else{
          this.isLoginError.emit(true)
      
        } 
      })
  }


  


}
