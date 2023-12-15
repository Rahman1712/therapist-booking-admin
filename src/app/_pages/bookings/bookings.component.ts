import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookingDTO } from 'src/app/_models/therapist/booking-dto';
import { TherapistAdminService } from 'src/app/_services/therapist-admin.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{

  constructor(
    private therapistAdminService: TherapistAdminService,
    ){
  }

  bookingDtoList: BookingDTO[];
  filteredBookings: BookingDTO[];
  currentPage = 1;
  itemsPerPage = 15; 
  totalItems: number;

  searchText: string;
  sortOrder: string = 'asc';
  sortProperty: string | number = 'fullname';

  ngOnInit(): void {
    this.getBookings();
  }

  public getBookings(): void{
    this.therapistAdminService.getAllBookings()
    .subscribe({
      next: (bookings: BookingDTO[]) =>{
        console.log(bookings)
        this.filteredBookings = this.bookingDtoList = bookings;
        this.totalItems = bookings.length;
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
      }
    });
  }

  public onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  public getPaginatedBookings(): BookingDTO[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBookings.slice(startIndex, endIndex);
  }

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

  public sortTable(property: keyof BookingDTO): void {
    this.sortProperty = property;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  
    this.filteredBookings.sort((a, b) => {
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

  applySearch(): void {
    this.filteredBookings = this.bookingDtoList.filter(booking =>
      (booking.id.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (booking.date.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (booking.paymentStatus.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (booking.bookingStatus.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  
    this.updatePagination();
  }

  updatePagination(): void {
    this.currentPage = 1; 
    this.totalItems = this.filteredBookings.length;
  }
}
