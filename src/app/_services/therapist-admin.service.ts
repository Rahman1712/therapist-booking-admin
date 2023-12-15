import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Review } from '../_models/therapist/review';
import { BookingDTO } from '../_models/therapist/booking-dto';
import { PaymentDto } from '../_models/therapist/payment-dto';

@Injectable({
  providedIn: 'root'
})
export class TherapistAdminService {

  constructor(private http: HttpClient) { }

  private apiTherapistsAdminPublicUrl = environment.apiTherapistsAdminPublicUrl;
  

  public getAllReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiTherapistsAdminPublicUrl}/all-reviews`);
  }
  public countOfReviews(): Observable<number> {
    return this.http.get<number>(`${this.apiTherapistsAdminPublicUrl}/count-reviews`);
  }
  public reviewFindById(id: number): Observable<Review>{
    return this.http.get<Review>(`${this.apiTherapistsAdminPublicUrl}/byid-review/${id}`);
  }

  public getAllBookings(): Observable<BookingDTO[]>{
    return this.http.get<BookingDTO[]>(`${this.apiTherapistsAdminPublicUrl}/all-bookings`);
  }
  public countOfBookings(): Observable<number> {
    return this.http.get<number>(`${this.apiTherapistsAdminPublicUrl}/count-bookings`);
  }
  public bookingFindById(id: string): Observable<BookingDTO>{
    return this.http.get<BookingDTO>(`${this.apiTherapistsAdminPublicUrl}/byid-booking/${id}`);
  }

  public getAllPayments(): Observable<PaymentDto[]>{
    return this.http.get<PaymentDto[]>(`${this.apiTherapistsAdminPublicUrl}/all-payments`);
  }
  public countOfPayments(): Observable<number> {
    return this.http.get<number>(`${this.apiTherapistsAdminPublicUrl}/count-payments`);
  }
  public paymentFindById(id: string): Observable<PaymentDto>{
    return this.http.get<PaymentDto>(`${this.apiTherapistsAdminPublicUrl}/byid-payment/${id}`);
  }



}
