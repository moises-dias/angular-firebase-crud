import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  resultsNumber: number = 10;
  onlySold: boolean = false;
  onlyForSale: boolean = false;
  constructor(
    private productService: ProductService,
    ) {}

  ngOnInit() {}

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }


  resultsQuantity(actual: number): boolean{
    return actual < this.resultsNumber ? true : false
  }

  checkSold(sold: boolean): boolean{
    if(!sold && this.onlySold){
      return false
    }
    else if(sold && this.onlyForSale){
      return false
    }
    return true
  }

  sort(property: string) {
    this.productService.productsList.sort((a,  b) => (a[property] > b[property]) ? 1 : -1)
  }
}
