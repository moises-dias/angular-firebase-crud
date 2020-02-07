import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  productsList: Product[];
  productForm;
  resultsNumber: number = 10;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      id: null,
      name: null,
      categories: null,
      purchaseValue: null,
      purchaseDate: null,
      purchaserName: null,
      purchaserContacts: null,
      saleValue: null,
      saleDate: null,
      salePlatforms: null,
      sold: null,
      details: null
    });
  }

  ngOnInit() {
    console.log("hi there")
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
  onSubmit(product) {
    console.log(product)
    this.create(
      {
        id: product.id,
        name: product.name,
        categories: product.categories.split(','),
        purchaseValue: product.purchaseValue,
        purchaseDate: product.purchaseDate,
        purchaserName: product.purchaserName,
        purchaserContacts: product.purchaserContacts.split(','),
        saleValue: product.saleValue,
        saleDate: product.saleDate,
        salePlatforms: product.salePlatforms.split(','),
        sold: product.sold,
        details: product.details
      }
    )

    console.log(this.productsList)
  }

  resultsQuantity(actual: number): boolean{
    return actual < this.resultsNumber ? true : false
  }

  add() {
    this.productsList.sort((a, b) => (a.name > b.name) ? 1 : -1)
    //   this.create(
    //     {
    //       id: 'id',
    //       name: 'controle',
    //       categories: ['ps1', 'xbox', 'perifericos'],
    //       purchaseValue: 123,
    //       purchaseDate: new Date,
    //       purchaserName: "paulo b.",
    //       purchaserContacts: ["41 92929292", "paulob@gmail.com"],
    //       saleValue: 456,
    //       saleDate: new Date,
    //       salePlatforms: ["olx", "mercado livre"],
    //       sold: true,
    //       details: null
    //     }
    //   )
  }



}
