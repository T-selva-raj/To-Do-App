import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

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
    private router: Router,
    private loader: LoaderService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)]]
    });
  }

  ngOnInit(): void { }

  OnSignIn() {
    const formData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loader.showLoader();
      this.subscriptionObj.add(
        this.auth.signIn(formData.email, formData.password).subscribe(
          (res: any) => {
            this.loader.hideLoader();
            localStorage.setItem("token", res?.token?.jwtToken);
            this.snackbar.openSnackBar({ message: "Logged In Successfully..!", snacktype: SnackType.Success, class: 'success' });
            this.router.navigate(['/app/dashboard']);
          },
          (error) => {
            this.loader.hideLoader();
            this.snackbar.openSnackBar({ message: error?.error, snacktype: SnackType.Error, class: 'error' });
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.loader.hideLoader();
    this.subscriptionObj.unsubscribe();
  }
}
