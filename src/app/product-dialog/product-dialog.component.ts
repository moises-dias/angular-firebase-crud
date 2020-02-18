import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService
    ) { }

  ngOnInit() {
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }

}
