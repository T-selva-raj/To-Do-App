import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private readonly scriptUrl = '1CQtJ2MNsOGtN6PKQ7xqfMpgaEHyQwHIeeELA1kDSY-bxcyCyGGLX4o1E';

  constructor(private http: HttpClient) { }

  submitForm(data: any) {
    return this.http.post(this.scriptUrl, data, { responseType: 'text' });
  }
}
