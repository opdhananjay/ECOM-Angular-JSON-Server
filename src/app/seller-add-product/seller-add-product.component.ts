import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  
  addProductMessageg!:string
  constructor(private Product:ProductService){}

  submit(data:Product){
    console.log(data)
    this.Product.addProduct(data).subscribe((result)=>{
      console.log(result)
      if(result){
        this.addProductMessageg = "Product Added Succefully"
      }
      setTimeout(() => {
          this.addProductMessageg = ""
        
      }, 3000);
    })
  }
}
