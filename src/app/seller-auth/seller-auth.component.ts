import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private service: SellerService, private Route: Router) { }

  signup(data: signup) {

    console.log(this.service.userSignUp(data))

  }
  authError:string = "";
  login(data: signup) {

    this.service.userLogin(data)
    this.service.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError =  "user email or pass is wrong"
      }
    })
  
  }

  ngOnInit() {
    this.service.reloadSeller()
  }


  showLogin: boolean = false
  openLogin() {
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }




}


