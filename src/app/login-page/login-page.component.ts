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
      this.subscriptionObj.add(
        this.auth.signIn(formData.email, formData.password).subscribe(
          (res: any) => {
            console.log("res", res.user);
            localStorage.setItem("uuid", res?.user?.uid);
            this.snackbar.openSnackBar({ message: "Logged Successfully..!", snacktype: SnackType.Success });
            this.router.navigate(['app/dashboard']);
          },
          (error) => {
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
              default:
                errorMessage = 'Internal server error.';
            }
            this.snackbar.openSnackBar({ message: errorMessage, snacktype: SnackType.Error });
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}
