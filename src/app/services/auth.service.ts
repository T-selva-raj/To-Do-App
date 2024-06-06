import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EMPTY, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  signUp(email: string, password: string) {
    console.log(email, password);

    return from(this.fireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(
        catchError((error) => {
          console.error('Error during sign up:', error);
          return EMPTY;
        })
      );
    // return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
  signIn(email: string, password: string) {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((error) => {
        return EMPTY;
      })
    )
  }
  // async checkEmailExists(email: string) {
  //   try {
  //     const methods = await this.fireAuth.fetchSignInMethodsForEmail(email);
  //     if (methods && methods.length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     return false;
  //   }
  // }
}
