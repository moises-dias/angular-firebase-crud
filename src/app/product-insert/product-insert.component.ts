import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }]
})
export class ProductInsertComponent implements OnInit {
  isLinear = true;
  formGroup: FormGroup;

  categoryList: string[] = [];

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

  getArray(){
    return <FormArray>this.formGroup.get('formArray');
  }
  myFunc(pos: string, val: string){
    console.log((<FormArray>this.formGroup.get('formArray')).controls[0].value.id.touched)
    return pos + val;
  }

  onKeydownEvent(value: string, keyCode: number) {
    console.log(keyCode);
    if(keyCode == 13) {
      this.categoryList.push(value);
      this.categoryList.sort();
      console.log(this.categoryList);
      (<FormArray>this.formGroup.get('formArray')).controls[0].patchValue({categories:''})
    }
  }

  createForm() {

    // id
    // name
    // details
    // categories

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
          id: [this.product ? this.product.id : null, null],
          'name': [this.product ? this.product.name : null, Validators.required],
          'categories': [this.product ? this.setCategoriesList(this.product.categories) : '', null],
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

  setCategoriesList(categories: string): string {
    this.categoryList = categories.split(',');
    return '';
  }

  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  onSubmit(array1, array2, array3) {
    const formProduct: Product = { ...array1, ...array2, ...array3 }
    console.log(formProduct);
    formProduct.categories=this.categoryList.toString();
    this.categoryList = [];
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
    console.log("test")
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
