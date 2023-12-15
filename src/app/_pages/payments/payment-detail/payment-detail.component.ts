import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentDto } from 'src/app/_models/therapist/payment-dto';
import { TherapistAdminService } from 'src/app/_services/therapist-admin.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {


  payment: PaymentDto;

  constructor(
    private route: ActivatedRoute,
    private therapistAdminService: TherapistAdminService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const paymentId = params['id'];
      if (paymentId) {
        this.therapistAdminService.paymentFindById(paymentId)
          .subscribe((payment) => {
            console.log(payment);
            this.payment = payment;
          });
      }
    });

  }

}
