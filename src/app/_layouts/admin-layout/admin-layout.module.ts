import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from 'src/app/_pages/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/_pages/user-profile/user-profile.component';
import { TherapistsComponent } from 'src/app/_pages/therapists/therapists.component';
import { UsersComponent } from 'src/app/_pages/users/users.component';
import { UsersfilterPipe } from 'src/app/_pipes/usersfilter.pipe';
import { TherapistDetailComponent } from 'src/app/_pages/therapist-detail/therapist-detail.component';
import { CategoryModalComponent } from 'src/app/_pages/category-modal/category-modal.component';
import { CategoriesComponent } from 'src/app/_pages/categories/categories.component';
import { CategoryAddComponent } from 'src/app/_pages/categories/category-add/category-add.component';
import { CategoryUpdateComponent } from 'src/app/_pages/categories/category-update/category-update.component';
import { CategoryViewComponent } from 'src/app/_pages/categories/category-view/category-view.component';
import { CategoryfilterPipe } from 'src/app/_pipes/categoryfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookingsComponent } from 'src/app/_pages/bookings/bookings.component';
import { ReviewsComponent } from 'src/app/_pages/reviews/reviews.component';
import { PaymentsComponent } from 'src/app/_pages/payments/payments.component';
import { ReportsComponent } from 'src/app/_pages/reports/reports.component';
import { AdminProfileComponent } from 'src/app/_pages/admin-profile/admin-profile.component';
import { BookingDetailComponent } from 'src/app/_pages/bookings/booking-detail/booking-detail.component';
import { ReviewDetailComponent } from 'src/app/_pages/reviews/review-detail/review-detail.component';
import { PaymentDetailComponent } from 'src/app/_pages/payments/payment-detail/payment-detail.component';
import { ReportDetailComponent } from 'src/app/_pages/reports/report-detail/report-detail.component';
import { PasswordChangeModelComponent } from 'src/app/_utils/password-change-model/password-change-model.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    DashboardComponent,

    UsersComponent,
    UserProfileComponent,

    TherapistsComponent,
    TherapistDetailComponent,
    
    CategoryModalComponent,
    CategoriesComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    CategoryViewComponent,
    
    BookingsComponent,
    BookingDetailComponent,
    
    ReviewsComponent,
    ReviewDetailComponent,

    PaymentsComponent,
    PaymentDetailComponent,

    ReportsComponent,
    ReportDetailComponent,

    AdminProfileComponent,
    PasswordChangeModelComponent,

    CategoryfilterPipe,
    UsersfilterPipe,
  ],
})
export class AdminLayoutModule { }
