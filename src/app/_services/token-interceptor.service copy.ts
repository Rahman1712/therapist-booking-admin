import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthenticationResponse } from '../_models/admin/AuthenticationResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  private refreshInProgress = false;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token is expired or invalid; try to refresh it.
          return this.authService.refreshToken().pipe(
            switchMap((response: AuthenticationResponse) => {
              // Save the new access token
              this.authService.setAccessToken(response.access_token);
              // Retry the request with the new token
              return next.handle(this.addToken(req));
            }),
            catchError((refreshError: any) => {
              // Handle the refresh token error or redirect to login
              this.authService.setIsLoggedIn(false);
              this.router.navigate(['/login']);
              return throwError(() => refreshError); // Use the factory function
            })
          );
        } else {
          //return throwError(error);
          return throwError(() => error); // Use the factory function
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getAccessToken();
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return req;
  }
}


/*
constructor(private injector: Injector) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        // Authorization: `Bearer xx.yy.zz`
        Authorization:  authService.getAccessToken()!=null ?`Bearer ${authService.getAccessToken()}`:''
      }
    })
    return next.handle(tokenizedReq)
  }

*/