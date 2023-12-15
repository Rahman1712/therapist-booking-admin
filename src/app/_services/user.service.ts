import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../_models/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiAdminUsersUrl = environment.apiAdminUsersUrl;

  constructor(private http: HttpClient) { }

   /* ============================= USER =========================================== */
   public getAllUsers(): Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(`${this.apiAdminUsersUrl}/getall`);
  }

  public getUserById(id: number): Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.apiAdminUsersUrl}/getbyid/${id}`);
  }

  public updateEnabledAndNonLocked(userId: number, nonlocked: boolean): Observable<string>{
    const url = `${this.apiAdminUsersUrl}/update/nonlocked/byid/${userId}`; 
    const params = new HttpParams().set('nonlocked', nonlocked);
    // const params = { nonLocked: String(admin.nonLocked) };
    return this.http.put(url, null,{params: params, responseType: 'text' });
  }
}
