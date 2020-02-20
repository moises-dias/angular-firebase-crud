import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material';
// import { Observable } from 'rxjs/Observable';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }]
})
export class ProductInsertComponent implements OnInit {
  isLinear = true;
  // name = new FormControl('');
  formGroup: FormGroup;
  firstStep: FormGroup;
  secondStep: FormGroup;

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  titleAlert: string = 'This field is required';
  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  product: Product;
  // productForm;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != "new") {
      console.log(this.productService.productsList)
      this.product = this.productService.productsList.find(element => element.id === id);
    }
    this.createForm();
  }

  createForm() {

    // id
    // name
    // categories
    // details

    // purchase value
    // purchase date


    // sold {
    // 	  sale value
    // 	  sale date
    // 	  sale platform
    // 	  purchaser name
    // 	  purchaser contacts
    // }

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          'id': [this.product ? this.product.id : null, null],
          'name': [this.product ? this.product.name : null, Validators.required],
          'categories': [this.product ? this.product.categories : null, null],
          'details': [this.product ? this.product.details : null, null]
        }),
        this.formBuilder.group({
          'purchaseValue': [this.product ? this.product.purchaseValue : null, null],
          'purchaseDate': [this.product ? this.product.purchaseDate : null, null],
        }),
        this.formBuilder.group({
          'sold': [this.product ? this.product.sold : null, null],
          'saleDate': [this.product ? this.product.saleDate : null, null],
          'saleValue': [this.product ? this.product.saleValue : null, null],
          'purchaserName': [this.product ? this.product.purchaserName : null, null],
          'purchaserContacts': [this.product ? this.product.purchaserContacts : null, null],
          'salePlatforms': [this.product ? this.product.salePlatforms : null, null],
          // 'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
        })
      ])
    });
  }

  // getErrorEmail() {
  //   return this.formGroup.get('email').hasError('required') ? 'Field is required' :
  //     this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
  //       this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  // }

  // getErrorPassword() {
  //   return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
  //     this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  // }

  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  onSubmit(array1, array2, array3) {
    const formProduct: Product = { ...array1, ...array2, ...array3 }
    console.log(formProduct);
    if (this.product) {
      this.update(formProduct)
    }
    else {
      this.create(formProduct)
    }
    this.location.back();
  }

  move() {
    // this.stepper.selectedIndex = 1
    console.log(this.stepper.selectedIndex)
  }
  selectionChange(event) {
  }
  opened() {
    console.log("open")
  }
  closed() {
    console.log("closed")
  }

}
