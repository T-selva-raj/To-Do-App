import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscriptionObj: Subscription = new Subscription();
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)]]
    });
  }

  ngOnInit(): void { }

  OnSignIn() {
    const formData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.subscriptionObj.add(
        this.auth.signIn(formData.email, formData.password).subscribe(
          (res: any) => {
            console.log("res", res.user);
            this.isLoading = false;
            localStorage.setItem("uuid", res?.user?.uid);
            this.snackbar.openSnackBar({ message: "Logged In Successfully..!", snacktype: SnackType.Success, class: 'success' });
            this.router.navigate(['app/dashboard']);
          },
          (error) => {
            this.isLoading = false;
            let errorMessage: string;
            switch (error.code) {
              case 'auth/user-not-found':
                errorMessage = 'User not found.';
                break;
              case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
              case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
              case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials';
                break;
              case 'auth/too-many-requests':
                errorMessage = 'Too many requests';
                break;
              default:
                errorMessage = 'Internal server error.';
            }
            this.snackbar.openSnackBar({ message: errorMessage, snacktype: SnackType.Error, class: 'error' });
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.isLoading = false;
    this.subscriptionObj.unsubscribe();
  }
}
