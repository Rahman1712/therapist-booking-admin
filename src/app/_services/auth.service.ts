import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../_models/admin/AuthenticationRequest';
import { AuthenticationResponse } from '../_models/admin/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  public loginUserGet():Observable<any>{
    return this.http.get(`${this.apiServiceUrl}/authenticate`, {responseType: 'text'});
  } 
  public loginUser(adminUserLogin: AuthenticationRequest):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiServiceUrl}/authenticate`, adminUserLogin, {withCredentials: true});
  } 

  public registerUser(data: any):Observable<any>{
    return this.http.post<any>(`${this.apiServiceUrl}/register`, data);
  }

  public refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiServiceUrl}/refresh-token`, null, {withCredentials: true});
  }

  public logoutUser():Observable<any>{
    return this.http.post<any>(`${this.apiServiceUrl}/logout`, null, {withCredentials: true});
  } 

  public setCookieData(): Observable<any>{
    // return this.http.get(`${this.apiServiceUrl}/set`, { responseType: 'text' });
    return this.http.get(`${this.apiServiceUrl}/set`, { responseType: 'text' , withCredentials: true});
  }
  public getCookieData(): Observable<any>{
    // return this.http.get(`${this.apiServiceUrl}/get` , { responseType: 'text'});
    return this.http.get(`${this.apiServiceUrl}/get` , { responseType: 'text' , withCredentials: true});
  }

  
  public setIsLoggedIn(value: boolean){
    localStorage.setItem('isLoggedIn', String(value));
  }

  public isLoggedIn() : boolean{
    return localStorage.getItem('isLoggedIn') == "true" ;
  }

  // public loggedIn(): boolean{
  //   return !!localStorage.getItem('jwt_access_token');
  // } 

  public setAccessToken(access_token: string) {
    localStorage.setItem('jwt_access_token', access_token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('jwt_access_token');
  }

  public setUserName(username: string) {
    localStorage.setItem('username', username);
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  public setRole(role: string) {
    localStorage.setItem('role', role);
  }


  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  public adminRoleMatch(allowedRoles: string[]): boolean{
    for(let i=0; i<allowedRoles.length ;i++){
      if(allowedRoles[i] === this.getRole()){
        return true;
      }
    }
    return false;
  }

  public logout(){
    this.logoutUser().subscribe(
      (response) => {
        this.clear();
        console.log('Logout successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }

  public clear() {
    localStorage.clear();
  }
}
