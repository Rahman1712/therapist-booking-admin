import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../_models/admin/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private refreshInProgress = false;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    if (this.refreshInProgress) {
      return next.handle(req); // Skip the request while a refresh is in progress
    }

    const requestWithToken = this.addToken(req);

    return next.handle(requestWithToken).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!this.refreshInProgress) {
            this.refreshInProgress = true;

            // Token is expired or invalid; try to refresh it.
            return this.authService.refreshToken().pipe(
              switchMap((response: AuthenticationResponse) => {
                
                this.authService.setAccessToken(response.access_token);
                //this.authService.setIsLoggedIn(true);

                return next.handle(this.addToken(req));
              }),
              catchError((refreshError: any) => {
                // Handle the refresh token error or redirect to login
                this.refreshInProgress = false;
                // this.authService.setIsLoggedIn(false);
                // this.router.navigate(['/login']);
                return throwError(() => refreshError); // Use the factory function
              }),
              finalize(() => {
                this.refreshInProgress = false;
              })
            );
          }
        }
        //return throwError(error);
        return throwError(() => error); // Use the factory function
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getAccessToken();
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
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