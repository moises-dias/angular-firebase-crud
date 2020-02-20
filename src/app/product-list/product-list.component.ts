import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  resultsNumber: number = 10;
  onlySold: boolean = false;
  onlyForSale: boolean = false;
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  productsList: Product[];

  displayedColumns: string[] = ['id', 'name', 'purchaseDate', 'saleValue'];
  dataSource = new MatTableDataSource(this.productsList);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.productService.getProducts().subscribe(actions => {
      this.productsList = actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { ...data, id } as Product;
      });
      this.dataSource = new MatTableDataSource(this.productsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(product: Product) {
    console.log(product)
    let dialogRef = this.dialog.open(ProductDialogComponent, { data: product });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`dialog result: ${result}`);
    // });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }
  logData(row) {
    console.log(row);
  }

  checkSold(sold: boolean): boolean {
    if (!sold && this.onlySold) {
      return false
    }
    else if (sold && this.onlyForSale) {
      return false
    }
    return true
  }
  showMe(row){
    console.log(row.purchaserName)
  }

}
