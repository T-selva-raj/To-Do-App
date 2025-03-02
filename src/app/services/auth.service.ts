import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ROUTES } from '../shared/constants/routes';
import { CryptoService } from './crypto.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService, private crypto: CryptoService) { }

  signUp(email: string, password: string, userName: string): Observable<any> {
    email = this.crypto.encryptDetails(email);
    password = this.crypto.encryptDetails(password);
    let data = { email, password, userName };
    return this.httpService.postMethod(ROUTES.REGISTER, data);
  }
  signIn(email: string, password: string): Observable<any> {
    email = this.crypto.encryptDetails(email);
    password = this.crypto.encryptDetails(password);
    const data = { email: email, password: password };
    return this.httpService.postMethod(ROUTES.LOGIN, data);
  }
}
