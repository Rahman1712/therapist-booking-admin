import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserDTO } from 'src/app/_models/user/user-dto';
import { ImageProcessingService } from 'src/app/_services/image-processing.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(
    private userService: UserService,
    private imageProcessingService: ImageProcessingService,
    ){
  }

  usersDtoList: UserDTO[];
  
  currentPage = 1;
  itemsPerPage = 10; 
  totalItems: number;
  
  searchText: string;
  sortOrder: string = 'asc';
  sortProperty: string | number = 'fullname';

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void{
    this.userService.getAllUsers()
    .subscribe({
      next: (users: UserDTO[]) =>{
        console.log(users)
        this.usersDtoList = users;
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        alert(error.message)
      }
    });
  }

  public updateActive(userId: number,nonLocked: boolean){
    console.log(userId, nonLocked)
    this.userService.updateEnabledAndNonLocked(userId,nonLocked)
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

  public getPaginatedUsers(): UserDTO[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.usersDtoList.slice(startIndex, endIndex);
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

  public sortTable(property: keyof UserDTO): void {
    this.sortProperty = property;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  
    this.usersDtoList.sort((a, b) => {
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
  

}
