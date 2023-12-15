import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TherapistAdminService } from 'src/app/_services/therapist-admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(
    public auth: AuthService,
    private therapistAdminService: TherapistAdminService,
    ){

  }

  countOfReviews : number = 0;
  countOfBookings : number = 0;
  countOfPayments : number = 0;

  ngOnInit(): void {
    this.countOfReviewsFunction();
    this.countOfBookingsFunction();
    this.countOfPaymentsFunction();
  }
  
  countOfReviewsFunction(){
    this.therapistAdminService.countOfReviews()
    .subscribe({
      next: (response: number) => this.countOfReviews = response ,
      error: (error: HttpErrorResponse) => console.log(error.message)
    })
  }
  countOfBookingsFunction(){
    this.therapistAdminService.countOfBookings()
    .subscribe({
      next: (response: number) => this.countOfBookings = response ,
      error: (error: HttpErrorResponse) => console.log(error.message)
    })
  }
  countOfPaymentsFunction(){
    this.therapistAdminService.countOfPayments()
    .subscribe({
      next: (response: number) => this.countOfPayments = response ,
      error: (error: HttpErrorResponse) => console.log(error.message)
    })
  }






}
