import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/enviorment';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private secretKey = environment.secret_key;
  constructor() { }

  encryptDetails(data: any): string {
    if (data) {
      const text = CryptoJS.AES.encrypt(data.toString(), this.secretKey).toString();
      return text.replace(/\\/g, '|');
    } else {
      return '';
    }
  }

  decryptDetails(data: string): string {
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data.replace(/\|/g, '\\'), this.secretKey);
      const result = bytes.toString(CryptoJS.enc.Utf8);
      return result;
    } else {
      return '';
    }
  }
}
