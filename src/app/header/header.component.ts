import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = "";
  userName:string = "Name Display Here"
  Searchresult!: Product[] | undefined
  SearchNotFound :string  | undefined
  cartItem = 0   // for displaying cart items


  constructor(private route: Router, private product: ProductService) { }


  seeCart(){
    alert("Login To see Cart")
    this.route.navigate(["/user-auth"])
  }

  ngOnInit() {
    

    let uid = localStorage.getItem("user")
    
    if(uid){
      let id = JSON.parse(uid)
      let userid = id.id  
    }

    this.route.events.subscribe((val: any) => {

      if (val.url) {
        if (localStorage.getItem("seller") && val.url.includes("seller")) {
          console.log("inside seller")
          this.menuType = "Seller"
          if (localStorage.getItem("seller")) {
            let sellerStore = localStorage.getItem("seller");
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name
          }
        }else if(localStorage.getItem("user")){
          let userStore = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData?.name
          this.menuType = "user"
          this.product.getCartList(userData.id)
          
        }
        else {
          console.log("outside seller")
          this.menuType = "default"
        }
      }
    });


    // displaying added cart length
    let cartData = localStorage.getItem("localCart")
    
    if(cartData){
      this.cartItem = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItem = items.length
    })
  
    
  }


  logout() {

    localStorage.removeItem("seller");
    this.route.navigate(["/"])
    
  }

  userLogout(){
    localStorage.removeItem("user");
    this.route.navigate(["/user-auth"])
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if (element.value) {
        this.product.searchproducts(element.value).subscribe((data) => {


          if (data.length >= 0) {

            this.Searchresult = data.slice(0, 3);
           
            if (this.Searchresult.length > 0) {
              this.SearchNotFound = "Products Found"
             
            } else {
              this.SearchNotFound = "No Products Found"
              
            }
          }

        })
      }else{
        this.SearchNotFound = undefined
      }
    }

  }




  hideSearch() {
    this.Searchresult = undefined
  }

  subSearch(val: string) {
    console.log("val", val)
    this.route.navigate([`/search/${val}`])
  }


  redirectToDetails(id:number){
      this.route.navigate([`/details/${id}`])
  }




  
  




}
