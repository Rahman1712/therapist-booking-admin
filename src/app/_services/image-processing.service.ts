import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Admin } from '../_models/admin/Admin';
import { FileHandle } from '../_models/file/FileHandle';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }



  public createUserDtoImage(userDto: any){
    if(userDto == null || userDto.image == null) return userDto;

    const imageByte: any = userDto.image;

    const imageBlob = this.dataURItoBlob(imageByte, userDto.imageType);

    const imageFile = new File([imageBlob], userDto.imageName, { type: userDto.imageType })

    const finalFileHandle : FileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    userDto.userImage = finalFileHandle

    return userDto;
  }

  public createAdminDtoImage(admin: Admin){
    if(admin == null || admin.image == null) return admin;

    const imageByte: any = admin.image;

    const imageBlob = this.dataURItoBlob(imageByte, admin.imageType);

    const imageFile = new File([imageBlob], admin.imageName, { type: admin.imageType })

    const finalFileHandle : FileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    admin.adminImage = finalFileHandle

    return admin;
  }

  public dataURItoBlob(picBytes: string, imageType: string){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i=0; i<byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}


/*
  public createAdminImage(admin: Admin){
    const imageByte: any = admin.image;

    const imageBlob = this.dataURItoBlob(imageByte, admin.imageType);

    const imageFile = new File([imageBlob], admin.imageName, { type: admin.imageType })

    const finalFileHandle : FileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    admin.adminImage = finalFileHandle

    return admin;
  }
*/