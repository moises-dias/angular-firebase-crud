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

  sort() {
    console.log(this.productService.productsList)
    this.productService.productsList.sort((a,  b) => (a.name > b.name) ? 1 : -1)
  }
}
