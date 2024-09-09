import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { LayoutComponent } from './components/static/layout/layout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protect routes under LayoutComponent
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      // More routes can be added here
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root URL to /home
  { path: '**', redirectTo: 'login' } // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
