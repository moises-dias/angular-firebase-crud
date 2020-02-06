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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getPolicies().subscribe(actions => {
      this.productsList = actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { ...data, id } as Product;
      });
    });
  }

  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }

  add() {
    this.create(
      {
        id: 'id',
        name: 'controle',
        categories: ['ps1', 'xbox', 'perifericos'],
        purchaseValue: 123,
        purchaseDate: new Date,
        purchaserName: "paulo b.",
        purchaserContacts: ["41 92929292", "paulob@gmail.com"],
        saleValue: 456,
        saleDate: new Date,
        salePlatforms: ["olx", "mercado livre"],
        sold: true
      }

    )
  }



}
