import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productDeleteMessage:string="";
  icon=faTrash;
  editIcon = faEdit;
  productList:undefined | Product[]
  constructor(private product:ProductService){}

  ngOnInit(){
   this.list()
  }

deleteProduct(id:number){
  this.product.deleteProduct(id).subscribe((data)=>{
    if(data){
        this.productDeleteMessage = "Product Deleted Succefully"
        this.list()

    }
setTimeout(() => {
  this.productDeleteMessage = ""

}, 2000);
  })
}


list(){
  this.product.productList().subscribe((data:any)=>{
    this.productList = data
    console.log(this.productList)
  })
}

}
