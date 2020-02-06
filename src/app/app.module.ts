import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PolicyListComponent } from './policy-list/policy-list.component'
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PolicyListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
