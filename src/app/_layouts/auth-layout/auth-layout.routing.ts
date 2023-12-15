import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/_pages/login/login.component";
import { RegisterComponent } from "src/app/_pages/register/register.component";


export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
];