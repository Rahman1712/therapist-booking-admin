import { Routes } from "@angular/router";
import { authGuard } from "src/app/_auth/auth.guard";
import { CategoriesComponent } from "src/app/_pages/categories/categories.component";
import { CategoryAddComponent } from "src/app/_pages/categories/category-add/category-add.component";
import { CategoryUpdateComponent } from "src/app/_pages/categories/category-update/category-update.component";
import { DashboardComponent } from "src/app/_pages/dashboard/dashboard.component";
import { TherapistDetailComponent } from "src/app/_pages/therapist-detail/therapist-detail.component";
import { TherapistsComponent } from "src/app/_pages/therapists/therapists.component";
import { UsersComponent } from "src/app/_pages/users/users.component";
import { BookingsComponent } from 'src/app/_pages/bookings/bookings.component';
import { ReviewsComponent } from 'src/app/_pages/reviews/reviews.component';
import { PaymentsComponent } from 'src/app/_pages/payments/payments.component';
import { ReportsComponent } from 'src/app/_pages/reports/reports.component';
import { UserProfileComponent } from "src/app/_pages/user-profile/user-profile.component";
import { AdminProfileComponent } from "src/app/_pages/admin-profile/admin-profile.component";
import { BookingDetailComponent } from "src/app/_pages/bookings/booking-detail/booking-detail.component";
import { ReviewDetailComponent } from "src/app/_pages/reviews/review-detail/review-detail.component";
import { PaymentDetailComponent } from "src/app/_pages/payments/payment-detail/payment-detail.component";
import { ReportDetailComponent } from "src/app/_pages/reports/report-detail/report-detail.component";

export const AdminLayoutRoutes: Routes = [
   { path: '', component: DashboardComponent ,  pathMatch: 'full', canActivate: [authGuard], },
   // { path: '', component: DashboardPageComponent ,  pathMatch: 'full', },
   { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard], },

   { path: 'users', component: UsersComponent, canActivate: [authGuard], /*canActivate: [AuthGuard],*/ },
   { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [authGuard], },

   { path: 'therapists', component: TherapistsComponent, canActivate: [authGuard], },
   { path: 'therapist/:id', component: TherapistDetailComponent, canActivate: [authGuard], },

   { path: 'categories', component: CategoriesComponent , canActivate: [authGuard], },
   { path: 'category-add', component: CategoryAddComponent , canActivate: [authGuard], },
   { path: 'category-update/:id', component: CategoryUpdateComponent , canActivate: [authGuard], },

   { path: 'bookings', component: BookingsComponent , canActivate: [authGuard], },
   { path: 'booking/:id', component: BookingDetailComponent , canActivate: [authGuard], },

   { path: 'reviews', component: ReviewsComponent , canActivate: [authGuard], },
   { path: 'review/:id', component: ReviewDetailComponent , canActivate: [authGuard], },


   { path: 'payments', component: PaymentsComponent , canActivate: [authGuard], },
   { path: 'payment/:id', component: PaymentDetailComponent , canActivate: [authGuard], },

   { path: 'reports', component: ReportsComponent , canActivate: [authGuard], },
   { path: 'report/:id', component: ReportDetailComponent , canActivate: [authGuard], },
   
   { path: 'admin-profile', component: AdminProfileComponent , canActivate: [authGuard], },
];