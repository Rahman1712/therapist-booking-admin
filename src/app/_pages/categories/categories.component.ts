import { Component, OnInit } from '@angular/core';
import { TherapistService } from 'src/app/_services/therapist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryDTO } from 'src/app/_models/therapist/category-dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryViewComponent } from './category-view/category-view.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(
    private therapistService: TherapistService,
    private modalService: NgbModal
    ){
  }

  ngOnInit(): void {
    this.getCategories();
  }

  categoryDtoList: CategoryDTO[];
  searchText: string;
  p: number = 1; // Current page for pagination
  itemsPerPage: number = 5; // Number of items to display per page

  public getCategories(): void{
    this.therapistService.getAllCategories()
    .subscribe({
      next: (next: CategoryDTO[]) =>{
        console.log(next)
        this.categoryDtoList = next;
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
      }
    });
  }

  openCategoryViewModal(category: CategoryDTO) {
    const modalRef = this.modalService.open(CategoryViewComponent, {
      centered: true, 
      size: 'sm', // Set the size of the modal
    });
    
    modalRef.componentInstance.category = category;
  }
}
