// Imports modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


let router = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
