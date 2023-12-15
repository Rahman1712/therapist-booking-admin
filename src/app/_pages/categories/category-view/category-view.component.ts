import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDTO } from 'src/app/_models/therapist/category-dto';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent {

  @Input() category: CategoryDTO;

  constructor(public activeModal: NgbActiveModal){}

  
}
