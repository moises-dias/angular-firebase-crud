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
    if (id != "new") {
      this.product = this.productService.productsList.find(element => element.id === id);
    }
    console.log(this.product);
  }
  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  onSubmit(formProduct: Product) {
    console.log("fora do if else")
    console.log(formProduct)
    console.log(formProduct.name)
    if (this.product) {
      console.log(formProduct.name)
      this.update(
        {
          id: formProduct.id,
          name: formProduct.name,
          categories: formProduct.categories,
          purchaseValue: formProduct.purchaseValue,
          purchaseDate: formProduct.purchaseDate,
          purchaserName: formProduct.purchaserName,
          purchaserContacts: formProduct.purchaserContacts,
          saleValue: formProduct.saleValue,
          saleDate: formProduct.saleDate,
          salePlatforms: formProduct.salePlatforms,
          sold: formProduct.sold,
          details: formProduct.details
        }
      )
    }
    else {
      console.log(formProduct.name)
      this.create(
        {
          id: formProduct.id,
          name: formProduct.name,
          categories: formProduct.categories,
          purchaseValue: formProduct.purchaseValue,
          purchaseDate: formProduct.purchaseDate,
          purchaserName: formProduct.purchaserName,
          purchaserContacts: formProduct.purchaserContacts,
          saleValue: formProduct.saleValue,
          saleDate: formProduct.saleDate,
          salePlatforms: formProduct.salePlatforms,
          sold: formProduct.sold,
          details: formProduct.details
        }
      )
    }
  }

}
