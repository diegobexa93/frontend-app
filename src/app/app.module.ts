import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips'; 
import { AngularMaterialModule } from './shared/components/angular-material.module';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './components/auth/services/auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuard } from './core/guards/auth.guard';

//Components

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/static/layout/layout.component';
import { HeaderComponent } from './components/static/header/header.component';
import { LeftmenuComponent } from './components/static/leftmenu/leftmenu.component';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

//
//Interceptors
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
//


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
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
    AuthService,
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideHttpClient()
  ],
  bootstrap:[
    AppComponent
  ]
})
export class AppModule { }
