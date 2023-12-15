import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/_models/therapist/review';
import { TherapistAdminService } from 'src/app/_services/therapist-admin.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {


  review: Review;

  constructor(
    private route: ActivatedRoute,
    private therapistAdminService: TherapistAdminService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const reviewId = params['id'];
      if (reviewId) {
        this.therapistAdminService.reviewFindById(reviewId)
          .subscribe((review) => {
            console.log(review);
            this.review = review;
          });
      }
    });

  }

}
