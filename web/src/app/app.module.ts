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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
