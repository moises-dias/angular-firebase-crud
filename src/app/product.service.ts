import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsList: Product[];

  constructor(private firestore: AngularFirestore) {
    this.getProducts().subscribe(actions => {
      this.productsList = actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { ...data, id } as Product;
      });
    });
   }
   
  // C
  createProduct(product: Product) {
    return this.firestore.collection('products').add(product);
  }
  // R
  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }
  // U
  updateProduct(product: Product) {
    delete product.id;
    this.firestore.doc('products/' + product.id).update(product);
  }
  // D
  deleteProduct(productId: string) {
    this.firestore.doc('products/' + productId).delete();
  }
  // getProductById(id: string) {
  //   const product = array1.find(element => element > 10);
  // }
}