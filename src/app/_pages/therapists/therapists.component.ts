import { Component, OnInit } from '@angular/core';
import { TherapistDTO } from 'src/app/_models/therapist/therapist-dto';
import { ImageProcessingService } from 'src/app/_services/image-processing.service';
import { TherapistService } from 'src/app/_services/therapist.service';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-therapists',
  templateUrl: './therapists.component.html',
  styleUrls: ['./therapists.component.css']
})
export class TherapistsComponent implements OnInit{

  constructor(
    private therapistService: TherapistService,
    private imageProcessingService: ImageProcessingService,
    ){
  }

  ngOnInit(): void {
    this.getTherapists();
  }

  therapistDtoList: TherapistDTO[];
  currentPage = 1;
  itemsPerPage = 15; 
  totalItems: number;

  searchText: string;
  sortOrder: string = 'asc';
  sortProperty: string | number = 'fullname';

  public getTherapists(): void{
    this.therapistService.getAllTherapists()
    .subscribe({
      next: (therapists: TherapistDTO[]) =>{
        // console.log(therapists);
        this.therapistDtoList = therapists;
        this.totalItems = therapists.length;
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }

  public activateOrDeactivateById(therapistId: number,activate: boolean){
    console.log(therapistId, activate)
    this.therapistService.activateOrDeactivateById(therapistId,activate)
    .subscribe({
      next: (next: string) =>{
        console.log(next)
        // this.ngOnInit();
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }

  public onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  public getPaginatedTherapists(): TherapistDTO[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.therapistDtoList.slice(startIndex, endIndex);
  }


  // public getPaginatedTherapists(): TherapistDTO[] {
  //   let filteredTherapists = this.therapistDtoList;
  
  //   // Apply search filter if searchText is not empty
  //   if (this.searchText && this.searchText.trim() !== '') {
  //     const searchTextLower = this.searchText.toLowerCase().trim();
  //     filteredTherapists = filteredTherapists.filter(
  //       therapist =>
  //         therapist.fullname.toLowerCase().includes(searchTextLower) ||
  //         therapist.username.toLowerCase().includes(searchTextLower) ||
  //         therapist.role.toLowerCase().includes(searchTextLower) ||
  //         therapist.email.toLowerCase().includes(searchTextLower)
  //     );
  //   }
  
  //   // Calculate pagination
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  
  //   this.totalItems = filteredTherapists.length;
  //   return filteredTherapists.slice(startIndex, endIndex);
  // }
  

  public getTotalPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public hasNextPage(): boolean {
    return this.currentPage < this.getTotalPages().length;
  }

  public goToPreviousPage(): void {
    if (this.hasPreviousPage()) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  public goToNextPage(): void {
    if (this.hasNextPage()) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  public sortTable(property: keyof TherapistDTO): void {
    this.sortProperty = property;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  
    this.therapistDtoList.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        // For string properties (fullname, email), use localeCompare for sorting
        return this.sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        // For numeric properties (id), use subtraction for sorting
        return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        // Handle other cases or non-comparable types if necessary
        return 0; // No change in order
      }
    });
  }
  
  

  // public getTotalPages(): number[] {
  //   const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  //   return Array(3).fill(0).map((x,index) => index + 1);
  // }

  // to create 1 to totalNum sequence array
  // public range(totalNum: number): number[]{
    
  //   return Array(totalNum).fill(0).map((x,index) => index + 1);
  // }
  // public rangeStart(start:number, totalNum: number): number[]{
  //   return Array(totalNum-start).fill(0).map((x,index) => index + 1+ start);
  // }

}
