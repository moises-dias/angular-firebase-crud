import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {
  product: Product;
  productForm;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location

  ) {
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
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
  }
  create(product: Product) {
    this.productService.createProduct(product);
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
  }

}
