import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips'; 
import { AngularMaterialModule } from './shared/components/angular-material.module';
import {provideHttpClient} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/static/header/header.component';
import { BodyComponent } from './components/static/body/body.component';
import { LeftmenuComponent } from './components/static/leftmenu/leftmenu.component';
import { LayoutComponent } from './components/static/layout/layout.component';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BodyComponent,
    LeftmenuComponent, 
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    AngularMaterialModule

  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap:[
    AppComponent
  ]
})
export class AppModule { }
