import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/_models/file/FileHandle';
import { CategoryDTO } from 'src/app/_models/therapist/category-dto';
import { TherapistService } from 'src/app/_services/therapist.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  constructor(
    private therapistService: TherapistService,
    private sanitizer: DomSanitizer,
    ){}

  categoryDtoList: CategoryDTO[];
  category: CategoryDTO = new CategoryDTO();
  categoryImageFile: FileHandle | undefined;

  ngOnInit(): void {
    this.getCategories();
  }

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

  addCategory(categoryForm: NgForm){   
    const findCategory = this.categoryDtoList.find(cat => cat.name == this.category.name);
    if(findCategory){
      alert("Category name already exist ");
      return;
    }
    if(this.category.name == undefined ||
      this.categoryImageFile == undefined ){
      alert("Please provide name and file");
      return;
    }
    const trimmedName = this.category.name.trim();
    if(trimmedName == ""){ 
      alert("Please provide name and file");
      return;
    }
    this.category.name = trimmedName;

    const formData =  this.prepareFormData(this.category);
    this.therapistService.addCategory(formData).subscribe({
      next: (next : CategoryDTO) => {
        categoryForm.reset();
        this.categoryImageFile = undefined;
        this.ngOnInit();
      },
      error : (error: HttpErrorResponse) =>{
        console.log(error)
      }
    });
  }


  prepareFormData(category: CategoryDTO): FormData{
    const formData = new FormData();

    formData.append(
      'category', 
      new Blob([JSON.stringify(category)], {
        type: 'application/json'
      })
    );

    formData.append(
      'file', 
      this.categoryImageFile!.file,
      this.categoryImageFile!.file.name,
    );
    
    return formData;
  }


  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
          )
      }

      this.categoryImageFile = fileHandle;
    }
  }



}
