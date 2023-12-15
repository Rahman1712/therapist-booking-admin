import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from 'src/app/_pages/login/login.component';
import { RegisterComponent } from 'src/app/_pages/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
    // RegisterComponent
  ],
})
export class AuthLayoutModule { }
