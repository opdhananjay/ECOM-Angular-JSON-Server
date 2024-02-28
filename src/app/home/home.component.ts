import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  popularProduct!:Product[]
  trendyProducts!:Product[]

  constructor(private popularProducts:ProductService){}

  ngOnInit(){
    this.popularProducts.popularProduct().subscribe((data)=>{
      console.log(data)
      this.popularProduct = data
    });

    this.popularProducts.trendyProduct().subscribe((data)=>{
      this.trendyProducts = data
    });
  }




}
