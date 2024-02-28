import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchResult : Product[] | undefined

  constructor(private r:ActivatedRoute,private product:ProductService){}

  ngOnInit() {
    let query = this.r.snapshot.paramMap.get("query")
    console.log("search",query)
    query && this.product.searchproducts(query).subscribe((res)=>{
        this.searchResult = res
        console.log("res",res)
        console.log("search",this.searchResult)
    })
  }
}
