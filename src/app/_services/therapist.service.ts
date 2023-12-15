import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TherapistDTO } from '../_models/therapist/therapist-dto';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../_models/therapist/category-dto';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  private apiAdminTherapistsUrl = environment.apiAdminTherapistsUrl;
  private apiAdminCategoryUrl = environment.apiAdminCategoryUrl;
  private apiTherapistsUrl = environment.apiTherapistsUrl;

  constructor(private http: HttpClient) { }

   /* ============================= Therapists =========================================== */
   public getAllTherapists(): Observable<TherapistDTO[]>{
    return this.http.get<TherapistDTO[]>(`${this.apiAdminTherapistsUrl}/getall`);
  }

  public getTherapistById(id: number): Observable<TherapistDTO>{
    return this.http.get<TherapistDTO>(`${this.apiAdminTherapistsUrl}/getbyid/${id}`);
  }

  public activateOrDeactivateById(therapistId: number, activate: boolean): Observable<string>{
    const url = `${this.apiAdminTherapistsUrl}/activate/byid/${therapistId}`; 
    const params = new HttpParams().set('activate', activate);
    return this.http.put(url, null,{params: params, responseType: 'text' });
  }

  public enableDisableById(therapistId: number, enabled: boolean): Observable<string>{
    const url = `${this.apiAdminTherapistsUrl}/enabled/byid/${therapistId}`; 
    const params = new HttpParams().set('enabled', enabled);
    return this.http.put(url, null,{params: params, responseType: 'text' });
  }

  public updateCategoriesToTherapistInfo(therapistInfoId: number, categoryNames: string[]): Observable<string>{
    const url = `${this.apiAdminTherapistsUrl}/update-categories/byid/${therapistInfoId}`; 
    const params = { categoryNames : categoryNames };
    return this.http.put(url, null,{params: params, responseType: 'text' });
  }

  download(): Observable<HttpEvent<Blob>>{
    return this.http.get(`http://localhost:8082/therapists/api/v1/public/download-document`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  /* ========================== CATEGORY GET ==================================== */
  public getAllCategories(): Observable<CategoryDTO[]>{
    return this.http.get<CategoryDTO[]>(`${this.apiTherapistsUrl}/all-categories`);
  }
  public getCategoryById(id: number): Observable<CategoryDTO>{
    return this.http.get<CategoryDTO>(`${this.apiTherapistsUrl}/byid-category/${id}`);
  }

 /* ============================= CATEGORY ================================ */ 
  public addCategory(formData: FormData): Observable<CategoryDTO>{
    return this.http.post<CategoryDTO>(`${this.apiAdminCategoryUrl}/save`, formData);
  }

  public updateCategoryById(formData: FormData, categoryId: number): Observable<CategoryDTO>{
    return this.http.put<CategoryDTO>(`${this.apiAdminCategoryUrl}/update/${categoryId}`, formData);
  }

  public deleteCategoryById(categoryId: number): Observable<string> {
    return this.http.delete(`${this.apiAdminCategoryUrl}/delete/${categoryId}`, { responseType: 'text' });
  }

}
