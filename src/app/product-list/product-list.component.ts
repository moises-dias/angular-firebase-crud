import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  resultsNumber: number = 10;
  onlySold: boolean = false;
  onlyForSale: boolean = false;
  productsList: Product[];
  soldList: Product[];
  forSaleList: Product[];
  displayedColumns: string[] = ['name', 'details', 'categories'];
  dataSource = new MatTableDataSource(this.productsList);
  soldDataSource = new MatTableDataSource(this.soldList);
  forSaleDataSource = new MatTableDataSource(this.forSaleList);

  nameFilter = new FormControl('');
  detailsFilter = new FormControl('');
  categoriesFilter = new FormControl('');
  filterValues = {
    name: '',
    details: '',
    categories: ''
  };

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.details.toString().toLowerCase().indexOf(searchTerms.details) !== -1
        && data.categories.toLowerCase().indexOf(searchTerms.categories) !== -1;
    }
    return filterFunction;
  }


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(actions => {
      this.productsList = actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { ...data, id } as Product;
      });

      this.soldList = this.productsList.filter(p => (p.saleValue) != null);
      this.forSaleList = this.productsList.filter(p => this.soldList.indexOf(p) < 0);

      this.dataSource = new MatTableDataSource(this.productsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.forSaleDataSource = new MatTableDataSource(this.forSaleList);
      this.forSaleDataSource.sort = this.sort;
      this.forSaleDataSource.paginator = this.paginator;
      this.forSaleDataSource.filterPredicate = this.createFilter();

      this.soldDataSource = new MatTableDataSource(this.soldList);
      this.soldDataSource.sort = this.sort;
      this.soldDataSource.paginator = this.paginator;
      this.soldDataSource.filterPredicate = this.createFilter();
    });

    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.forSaleDataSource.filter = JSON.stringify(this.filterValues);
          this.soldDataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.detailsFilter.valueChanges
      .subscribe(
        details => {
          this.filterValues.details = details;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.forSaleDataSource.filter = JSON.stringify(this.filterValues);
          this.soldDataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.categoriesFilter.valueChanges
      .subscribe(
        categories => {
          this.filterValues.categories = categories;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          this.forSaleDataSource.filter = JSON.stringify(this.filterValues);
          this.soldDataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  openDialog(product: Product) {
    console.log(product)
    let dialogRef = this.dialog.open(ProductDialogComponent, { data: product });
    console.log(this.forSaleList)
    console.log(this.soldList)
    console.log(this.productsList)

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`dialog result: ${result}`);
    // });
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }

}
