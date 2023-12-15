import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/_models/admin/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/_models/admin/AuthenticationResponse';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _auth: AuthService,
    private _router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this._router.navigate(['/']);
    }
  }

  public adminLoginDetail: AuthenticationRequest = new AuthenticationRequest();

  // token!: AuthenticationResponse;
  loginError: boolean = false;
  errorMsg: string = 'error';
  loggedOut: boolean = false;

  
  // loginUser() {
  //   this._auth.clear()
  //   console.log(this.adminLoginDetail)
  //   this._auth.loginUserGet()
  //     .subscribe(
  //       {
  //         next: (next: any) => {  //AuthenticationResponse
  //           console.log(next)
  //         },
  //         error: (error: HttpErrorResponse) => {
  //           console.log(error);
            
  //         }
  //       }
  //     );
  // }

  loginUser() {
    this._auth.clear()
    console.log(this.adminLoginDetail)
    this._auth.loginUser(this.adminLoginDetail)
      .subscribe(
        {
          next: (next: AuthenticationResponse) => {  //AuthenticationResponse
            console.log(next)
            this._auth.setAccessToken(next.access_token);
            this._auth.setUserName(next.username);
            this._auth.setRole(next.role);
            this._auth.setIsLoggedIn(true);

            //  this.cookieService.set('refresh_token', next.refresh_token);

            this._router.navigate(['/dashboard'])

            //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            //this._router.navigateByUrl(returnUrl);
            this.loggedOut = false;
            this.loginError = false;
          },
          error: (error: HttpErrorResponse) => {
            this.loginError = true;
            this.errorMsg = error.error.errorMessage
            this.showError(error.error.errorMessage)
          }
        }
      );
  }

  isErrorOnLogin() {
    return this.loginError;
  }

  isLoggedOut() {
    return this.loggedOut;
  }

  showSuccess() {
    this.toastr.success('Login', 'logged successfully')
      .onTap
      // .pipe(take(1))
      .subscribe(() => this.toasterClickedHandler());;
  }

  showError(error: any) {
    this.toastr.error('Login Error', error);
  }

  toasterClickedHandler() {
    console.log('Toastr clicked');
  }
}
