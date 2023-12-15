import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../_models/admin/Admin';
import { AdminRequest } from '../_models/admin/AdminRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiAdminPrivateUrl = environment.apiAdminPrivateUrl;

  constructor(private http: HttpClient) { }

  public getAdminByUsername(adminUsername: string): Observable<Admin>{
    return this.http.get<Admin>(`${this.apiAdminPrivateUrl}/get/byUsername/${adminUsername}`);
  }

  public updatePasswordById(admin: Admin, currentPassword: string, newPassword:string )
  : any  //: Observable<string>
  {
    const url = `${this.apiAdminPrivateUrl}/update/password/byId/${admin.id}`; 
    const params = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    // return this.http.put(url, null,{params: params, responseType: 'text' });
    return this.http.put(url, null,{params: params, responseType: 'text' });
  }

  public updateAdminImage(adminId: number, formData: FormData): Observable<string> {
    return this.http.put(`${this.apiAdminPrivateUrl}/update-image/byId/${adminId}`, formData,{ responseType: 'text' })
  }

  public updateAdminDetails(adminId: number, request: AdminRequest): Observable<string> {
    return this.http.put(`${this.apiAdminPrivateUrl}/update-details/byId/${adminId}`, request,{ responseType: 'text' })
  }

}
