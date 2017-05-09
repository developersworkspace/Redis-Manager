// Imports modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { KeysComponent } from './keys/keys.component';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


let router = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'keys/:clusterName',
    component: KeysComponent
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeysComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
