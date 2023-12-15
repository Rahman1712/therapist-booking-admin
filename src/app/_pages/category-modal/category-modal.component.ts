import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit{
  @ViewChild('categoryModal') categoryModal: ElementRef;
  
  ngOnInit(): void {
    
  }
  constructor(public activeModal: NgbActiveModal){}

  @Input() categoriesList: string[];
  @Input() selectedCategories: string[];
  @Output() saveCategoriesEvent = new EventEmitter<string[]>();
  alertMessage: string = '';
  alertType: string = 'info';

  selectedCategory: string = '';

  addCategory() {
    if (this.selectedCategory && !this.selectedCategories.includes(this.selectedCategory)) {
      this.selectedCategories.push(this.selectedCategory);
    }
  }

  removeCategory(category: string) {
    this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
  }

  saveCategories() {
    if (this.selectedCategories.length > 0) {
      this.saveCategoriesEvent.emit(this.selectedCategories);
      this.closeModal();
    } else {
      this.alertMessage = 'Please select at least one category.';
      this.alertType = 'warning';
    }
  }

  closeModal() {
    this.activeModal.close('close');
  }

  alertClear(){
    this.alertMessage = '';
  }
}
