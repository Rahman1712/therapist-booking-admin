import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './_layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './_components/components.module';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgbAlertModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,   
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
