import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingDTO } from 'src/app/_models/therapist/booking-dto';
import { TherapistAdminService } from 'src/app/_services/therapist-admin.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {


  booking: BookingDTO;

  constructor(
    private route: ActivatedRoute,
    private therapistAdminService: TherapistAdminService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const bookingId = params['id'];
      if (bookingId) {
        this.therapistAdminService.bookingFindById(bookingId)
          .subscribe((booking) => {
            console.log(booking);
            this.booking = booking;
          });
      }
    });

  }

}
