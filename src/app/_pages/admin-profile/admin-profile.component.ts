import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/_models/admin/Admin';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ImageProcessingService } from 'src/app/_services/image-processing.service';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PasswordChangeModelComponent } from 'src/app/_utils/password-change-model/password-change-model.component';
import { FileHandle } from 'src/app/_models/file/FileHandle';
import { AdminRequest } from 'src/app/_models/admin/AdminRequest';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {


  admin: Admin;
  adminImageFile: FileHandle | undefined;
  currentPassword: string = '';
  newPassword: string = '';
  renewPassword: string = '';
  adminRequest : AdminRequest = new AdminRequest();

  dialogRef: MatDialogRef<PasswordChangeModelComponent> | null;

  constructor(
    private auth: AuthService,
    private adminService: AdminService,
    private imageProcessingService: ImageProcessingService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAdminData();
  }

  public getAdminData() {
    this.adminService.getAdminByUsername(this.auth.getUsername()!)
      .pipe(
        map((admin: Admin) => this.imageProcessingService.createAdminDtoImage(admin))
      )
      .subscribe({
        next: (admin: Admin) => {
          console.log(admin);
          this.admin = admin;
          this.adminImageFile = this.admin.adminImage;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }


  updateAdminCredential(){
    if(this.newPassword != this.renewPassword){
      this.dialogRef = this.dialog.open(PasswordChangeModelComponent, {
        disableClose: false
      });
      this.dialogRef.componentInstance.title = "Password error ?";
      this.dialogRef.componentInstance.message = "new password and renew password are not same";
      this.dialogRef.componentInstance.isError = true;
      this.dialogRef.afterClosed().subscribe(result => {
        this.dialogRef = null;
      });
      return;
    }
    //console.log('passwordForm values :',this.passwordForm.value)
    this.adminService.updatePasswordById(this.admin, this.currentPassword, this.newPassword)
    .subscribe({
      next: (next:any) =>{
        console.log(next)
        
        this.dialogRef = this.dialog.open(PasswordChangeModelComponent, {
          disableClose: true
        });
        this.dialogRef.componentInstance.title = "Password changed success";
        this.dialogRef.componentInstance.message = "Please logout to continue";
        this.dialogRef.componentInstance.isError = false;
        this.dialogRef.afterClosed().subscribe(result => {
          this.dialogRef = null;
        });
        
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        const errorMessage = error.error; //"{\"errorMessage\":\"current password doesn't match\"}"
        const errorObject = JSON.parse(errorMessage);
        const extractedErrorMessage = errorObject.errorMessage;

        this.dialogRef = this.dialog.open(PasswordChangeModelComponent, {
          disableClose: false
        });
        this.dialogRef.componentInstance.title = "Error occured";
        this.dialogRef.componentInstance.message = extractedErrorMessage;
        this.dialogRef.componentInstance.isError = true;
        this.dialogRef.afterClosed().subscribe(result => {
          this.dialogRef = null;
        });
      }
    });
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

      this.adminImageFile = fileHandle;
    }
  }

  
  updateAdminImage(){
    const formData = new FormData();
    formData.append(
      'file', 
      this.adminImageFile!.file,
      this.adminImageFile!.file.name,
    );

    if(this.adminImageFile!.file.name == "null" || this.adminImageFile!.file.name == null){
      console.log(this.adminImageFile )
      alert('please select image');
      return;
    }
    
    this.adminService.updateAdminImage(this.admin.id, formData).subscribe({
      next: (next : string) => {
        console.log(next)

        location.reload(); //reload page
      },
      error : (error: HttpErrorResponse) =>{
        console.log(error)
      }
    });
  }

  deleteImage(){
    this.adminImageFile = undefined;
  }

  updateAdminDetails() {
    if (this.isValid()) {
      console.log(this.adminRequest);
      this.adminService.updateAdminDetails(this.admin.id, this.adminRequest).subscribe({
        next: (next: string) => {
          console.log(next);
          location.reload(); 
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    } else {
      // alert('Please provide correct details.');
    }
  }

  isValid(): boolean | any{
    const mobilePattern = /^\d{10}$/; // Pattern for 10-digit number
    const isValidFullName = this.adminRequest.fullname && this.adminRequest.fullname.length >= 3;
    const isValidMobile = this.adminRequest.mobile && mobilePattern.test(this.adminRequest.mobile);
    const isValidEmail = this.isValidEmail(this.adminRequest.email);

    return isValidFullName && isValidMobile && isValidEmail;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

}
