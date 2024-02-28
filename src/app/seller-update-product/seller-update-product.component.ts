import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
productData!:Product
UpdateProductMessage:string = "";
constructor(private route:ActivatedRoute,private product:ProductService,private r:Router){}

ngOnInit(){
  let productId = this.route.snapshot.paramMap.get("id")
  console.log(productId)
productId && this.product.getProduct(productId).subscribe((data)=>{
    console.log(data)
    this.productData = data
  })
}


  submit(data:any){ 
      console.log(data)
      data.id = this.productData.id
      this.product.updateProduct(data).subscribe((res)=>{
        if(res){
            this.UpdateProductMessage = "Product is Updated"
        }
      })
      setTimeout(() => {
          this.UpdateProductMessage = ""
          this.r.navigate(["/seller-home"])
      }, 2000);

     
  }

}
