import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/_models/file/FileHandle';
import { CategoryDTO } from 'src/app/_models/therapist/category-dto';
import { TherapistService } from 'src/app/_services/therapist.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  constructor(
    private therapistService: TherapistService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
    ){}

  category: CategoryDTO = new CategoryDTO();
  categoryImageFile: FileHandle | undefined;
  categoryDtoList: CategoryDTO[];
  categoryId: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.productId = params['id'];
       this.categoryId =  Number(params['id']);
       this.getCategoryById(this.categoryId);
      })
      this.getCategories();
  }

  getCategoryById(categoryId: number){
    this.therapistService.getCategoryById(categoryId)
    .subscribe({
      next: (next: CategoryDTO) =>{
        this.category = next;
        this.setCategoryImageFromUrl(this.category.imageUrl);
      },
      error: (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    });
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

  updateCategory(categoryForm: NgForm, categoryId: number){   
    const formData =  this.prepareFormData(this.category);

    this.therapistService.updateCategoryById(formData, categoryId ).subscribe({
      next: (next : CategoryDTO) => {
        this.clearForm(categoryForm);
        //this.getCategoryParents();
        this.router.navigate(['/categories']);
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

  setCategoryImageFromUrl(imageUrl: string) {
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

    const fileHandle: FileHandle = {
      file: new File([], 'categoryImage.png'), // Placeholder file
      url: safeUrl
    };

    this.categoryImageFile = fileHandle;
  }

  clearForm(categoryForm: NgForm){
    categoryForm.reset();
    this.categoryImageFile = undefined;
  }


}
