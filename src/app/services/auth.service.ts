import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  SingUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
}
