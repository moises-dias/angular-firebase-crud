import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {
  // name = new FormControl('');
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';


  product: Product;
  // productForm;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id != "new") {
      this.product = this.productService.productsList.find(element => element.id === id);

      // this.formGroup.patchValue({email: "test"});
      // this.productForm.get('id').setValue(this.product.id);
      // this.productForm.get('name').setValue(this.product.name);
      // this.productForm.get('categories').setValue(this.product.categories);
      // this.productForm.get('purchaseValue').setValue(this.product.purchaseValue);
      // this.productForm.get('purchaseDate').setValue(this.product.purchaseDate);
      // this.productForm.get('purchaserName').setValue(this.product.purchaserName);
      // this.productForm.get('purchaserContacts').setValue(this.product.purchaserContacts);
      // this.productForm.get('saleValue').setValue(this.product.saleValue);
      // this.productForm.get('saleDate').setValue(this.product.saleDate);
      // this.productForm.get('salePlatforms').setValue(this.product.salePlatforms);
      // this.productForm.get('sold').setValue(this.product.sold);
      // this.productForm.get('details').setValue(this.product.details);
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.product ? this.product.id : null, Validators.required],
      'name': [this.product ? this.product.name : null, Validators.required],
      'categories': [this.product ? this.product.categories : null, Validators.required],
      'purchaseValue': [this.product ? this.product.purchaseValue : null, Validators.required],
      'purchaseDate': [this.product ? this.product.purchaseDate : null, Validators.required],
      'purchaserName': [this.product ? this.product.purchaserName : null, Validators.required],
      'purchaserContacts': [this.product ? this.product.purchaserContacts : null, Validators.required],
      'saleValue': [this.product ? this.product.saleValue : null, Validators.required],
      'saleDate': [this.product ? this.product.saleDate : null, Validators.required],
      'salePlatforms': [this.product ? this.product.salePlatforms : null, Validators.required],
      'sold': [this.product ? this.product.sold : null, Validators.required],
      'details': [this.product ? this.product.details : null, Validators.required]
      // 'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
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
