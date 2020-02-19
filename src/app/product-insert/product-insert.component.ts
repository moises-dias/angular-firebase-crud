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

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          'id': [this.product ? this.product.id : null, Validators.required],
        }),
        this.formBuilder.group({
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
        }),
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

  onSubmit(formProduct: Product) {
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
    console.log(event.selectedIndex)

    if (event.selectedIndex === 0) {

      console.log("first")
      // this.formGroup.get('id').setValidators([Validators.required]);
      // this.formGroup.get('name').setValidators(null);
      // this.formGroup.get('categories').setValidators(null);
      // this.formGroup.get('purchaseValue').setValidators(null);
      // this.formGroup.get('purchaseDate').setValidators(null);
      // this.formGroup.get('purchaserName').setValidators(null);
      // this.formGroup.get('purchaserContacts').setValidators(null);
      // this.formGroup.get('saleValue').setValidators(null);
      // this.formGroup.get('saleDate').setValidators(null);
      // this.formGroup.get('salePlatforms').setValidators(null);
      // this.formGroup.get('sold').setValidators(null);
      // this.formGroup.get('details').setValidators(null);

      // this.formGroup.get('id').updateValueAndValidity();
      // this.formGroup.get('name').updateValueAndValidity();
      // this.formGroup.get('categories').updateValueAndValidity();
      // this.formGroup.get('purchaseValue').updateValueAndValidity();
      // this.formGroup.get('purchaseDate').updateValueAndValidity();
      // this.formGroup.get('purchaserName').updateValueAndValidity();
      // this.formGroup.get('purchaserContacts').updateValueAndValidity();
      // this.formGroup.get('saleValue').updateValueAndValidity();
      // this.formGroup.get('saleDate').updateValueAndValidity();
      // this.formGroup.get('salePlatforms').updateValueAndValidity();
      // this.formGroup.get('sold').updateValueAndValidity();
      // this.formGroup.get('details').updateValueAndValidity();
    }

    if (event.selectedIndex === 1) {

      console.log("second")
      // this.formGroup.get('id').setValidators(null);
      // this.formGroup.get('name').setValidators([Validators.required]);
      // this.formGroup.get('categories').setValidators([Validators.required]);
      // this.formGroup.get('purchaseValue').setValidators([Validators.required]);
      // this.formGroup.get('purchaseDate').setValidators([Validators.required]);
      // this.formGroup.get('purchaserName').setValidators([Validators.required]);
      // this.formGroup.get('purchaserContacts').setValidators([Validators.required]);
      // this.formGroup.get('saleValue').setValidators([Validators.required]);
      // this.formGroup.get('saleDate').setValidators([Validators.required]);
      // this.formGroup.get('salePlatforms').setValidators([Validators.required]);
      // this.formGroup.get('sold').setValidators([Validators.required]);
      // this.formGroup.get('details').setValidators([Validators.required]);

      // this.formGroup.get('id').updateValueAndValidity();
      // this.formGroup.get('name').updateValueAndValidity();
      // this.formGroup.get('categories').updateValueAndValidity();
      // this.formGroup.get('purchaseValue').updateValueAndValidity();
      // this.formGroup.get('purchaseDate').updateValueAndValidity();
      // this.formGroup.get('purchaserName').updateValueAndValidity();
      // this.formGroup.get('purchaserContacts').updateValueAndValidity();
      // this.formGroup.get('saleValue').updateValueAndValidity();
      // this.formGroup.get('saleDate').updateValueAndValidity();
      // this.formGroup.get('salePlatforms').updateValueAndValidity();
      // this.formGroup.get('sold').updateValueAndValidity();
      // this.formGroup.get('details').updateValueAndValidity();
    }
  }

}
