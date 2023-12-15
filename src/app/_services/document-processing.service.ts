import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DocumentProcessingService {
    constructor(private sanitizer: DomSanitizer,) { }

  public generateDocumentUrl(documentBytes: any, documentName: string, documentType: string): SafeResourceUrl {
    const byteString = window.atob(documentBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: documentType });
    const pdfFile = new File([blob], documentName, { type: documentType });

    return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(pdfFile));
  }
  
}
