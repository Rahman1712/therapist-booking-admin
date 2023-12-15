import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TherapistDTO } from 'src/app/_models/therapist/therapist-dto';
import { DocumentProcessingService } from 'src/app/_services/document-processing.service';
import { ImageProcessingService } from 'src/app/_services/image-processing.service';
import { TherapistService } from 'src/app/_services/therapist.service';
// import {saveAs} from 'file-saver';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDTO } from 'src/app/_models/therapist/category-dto';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-therapist-detail',
  templateUrl: './therapist-detail.component.html',
  styleUrls: ['./therapist-detail.component.css']
})
export class TherapistDetailComponent implements OnInit {
  @ViewChild('categoryModal') categoryModal: ElementRef;
  @ViewChild('content') content: ElementRef;

  therapist: TherapistDTO;
  categoriesList: string[];
  fileStatus = {status: '', requestType: '', percent: 0};
  pdfUrl: SafeResourceUrl; 
  educationPdfUrl: SafeResourceUrl; 
  experiencePdfUrl: SafeResourceUrl; 
  additionalPdfUrl: SafeResourceUrl; 
  selectedCategories: string[] = [];
  alertMessage: string = '';
  alertType: string = 'info'; 

  constructor(
    private route: ActivatedRoute,
    private therapistService: TherapistService,
    private imageProcessingService: ImageProcessingService,
    private documentProcessingService: DocumentProcessingService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.selectedCategories = [];

    this.route.params.subscribe((params) => {
      const therapistId = params['id'];
      if (therapistId) {
        this.therapistService.getTherapistById(therapistId)
          .subscribe((therapist) => {
            console.log(therapist);
            
            this.therapist = therapist;
            if(this.therapist != null && this.therapist.therapistInfoDto != null){
              const info = this.therapist.therapistInfoDto;
              this.educationPdfUrl = this.documentProcessingService.generateDocumentUrl(info.educationalCertificate, 'educational_certificate.pdf',info.educationalCertificateType);
              this.experiencePdfUrl = this.documentProcessingService.generateDocumentUrl(info.experienceCertificate, 'experience_certificate.pdf',info.experienceCertificateType);
              this.additionalPdfUrl = this.documentProcessingService.generateDocumentUrl(info.additionalCertificate, 'additional_certificate.pdf',info.additionalCertificateType);

              info.categories.forEach(category => this.selectedCategories.push(category.name));
            }
          });
      }
    });

    this.getAllCategories();
  }

  getAllCategories(){
    this.therapistService.getAllCategories().subscribe({
      next: (response: CategoryDTO[]) => {
        this.categoriesList = response.map(category => category.name);
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  toggleActivation(){
    this.therapistService.activateOrDeactivateById(this.therapist.id, !this.therapist.activated)
    .subscribe({
      next: (next: string) =>{
        console.log(next)
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }
  toggleEnableDisable(){
    this.therapistService.enableDisableById(this.therapist.id, !this.therapist.enabled)
    .subscribe({
      next: (next: string) =>{
        console.log(next)
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }

  openPdfModal(contentB: any, pdfUrl: any) {
    console.log(pdfUrl);
    
    // Convert the byte array to a Blob
    this.pdfUrl = pdfUrl

    // this.modalService.open(contentB, {
    this.modalService.open(this.content, {
      centered: true,
      windowClass: 'full-width-modal',
      backdrop: 'static',
      size: 'lg',
    });
  }

  addOrRemoveCategories(category: any): void {
    const index = this.selectedCategories.indexOf(category);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  }

  openCategoryModal() {
    const modalRef = this.modalService.open(CategoryModalComponent, {
      centered: true, 
      backdrop: 'static', // Prevent closing the modal by clicking outside
      size: 'lg', // Set the size of the modal
    });
    
    modalRef.componentInstance.categoriesList = this.categoriesList;
    modalRef.componentInstance.selectedCategories = this.selectedCategories;
    modalRef.componentInstance.saveCategoriesEvent = new EventEmitter<string[]>(); 
    modalRef.componentInstance.saveCategoriesEvent.subscribe((categories: string[]) => {
      if (categories.length > 0) {
        this.saveCategories(categories);
        
      } else {
        modalRef.componentInstance.alertMessage = 'Please select at least one category.';
        modalRef.componentInstance.alertType = 'warning';
      }
    });
  
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
  
  saveCategories(categories: string[]) {
    this.selectedCategories = categories;
    this.therapistService.updateCategoriesToTherapistInfo(
      this.therapist.therapistInfoDto.id, 
      this.selectedCategories).subscribe({
        next: (response: string) => {
          console.log(response);
          this.alertMessage = '✔️ category updated successfully... ';
          this.alertType = 'success';        
          this.ngOnInit();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
    });    
  }

  alertClear(){
    this.alertMessage = '';
  }
}

/*
  downloadFile(){
    this.therapistService.download().subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void{
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading')
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading')
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){

        }else{
          //download logic
          saveAs(new File([httpEvent.body!], 'filename.pdf',
            {type: 'application/pdf;charset=utf-8'}
          ));
          // saveAs(new Blob([httpEvent.body!], 
          //   {type: 'application/pdf;charset=utf-8'}),
          //   'filename.pdf'
          // );
        }
        this.fileStatus.status = 'done';
        break;
      default:
          console.log(httpEvent);
          
    }
  }


  private updateStatus(loaded: number, total: number , requestType: string){
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
*/