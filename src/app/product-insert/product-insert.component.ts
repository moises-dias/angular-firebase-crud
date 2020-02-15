import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
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
  name = new FormControl('');

  product: Product;
  productForm;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location

  ) {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      categories: new FormControl(''),
      purchaseValue: new FormControl(''),
      purchaseDate: new FormControl(''),
      purchaserName: new FormControl(''),
      purchaserContacts: new FormControl(''),
      saleValue: new FormControl(''),
      saleDate: new FormControl(''),
      salePlatforms: new FormControl(''),
      sold: new FormControl(''),
      details: new FormControl('')
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != "new") {
      this.product = this.productService.productsList.find(element => element.id === id);
      
      this.productForm.get('id').setValue(this.product.id);
      this.productForm.get('name').setValue(this.product.name);
      this.productForm.get('categories').setValue(this.product.categories);
      this.productForm.get('purchaseValue').setValue(this.product.purchaseValue);
      this.productForm.get('purchaseDate').setValue(this.product.purchaseDate);
      this.productForm.get('purchaserName').setValue(this.product.purchaserName);
      this.productForm.get('purchaserContacts').setValue(this.product.purchaserContacts);
      this.productForm.get('saleValue').setValue(this.product.saleValue);
      this.productForm.get('saleDate').setValue(this.product.saleDate);
      this.productForm.get('salePlatforms').setValue(this.product.salePlatforms);
      this.productForm.get('sold').setValue(this.product.sold);
      this.productForm.get('details').setValue(this.product.details);
    }
  }
  
  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  onSubmit(formProduct: Product) {
    if (this.product) {
      this.update(formProduct)
    }
    else {
      this.create(formProduct)
    }
    this.location.back();
  }

}
