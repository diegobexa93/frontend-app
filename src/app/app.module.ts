import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips'; 
import { AngularMaterialModule } from './shared/components/angular-material.module';

import { HeaderComponent } from './components/static/header/header.component';
import { BodyComponent } from './components/static/body/body.component';
import { LeftmenuComponent } from './components/static/leftmenu/leftmenu.component';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
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
    ReactiveFormsModule,
    MatChipsModule,
    AngularMaterialModule

  ],
  providers: [
    AppComponent
  ]
})
export class AppModule { }
