import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  productsList: Product[];
  resultsNumber: number = 10;

  constructor(
    private productService: ProductService,
    ) {  }

  ngOnInit() {
    console.log("hi there")
    this.productService.getProducts().subscribe(actions => {
      this.productsList = actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { ...data, id } as Product;
      });
    });
  }

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
    this.productsList.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }
}
