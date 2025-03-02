import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  subscribtionObj: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private loader: LoaderService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  onSignup() {
    const formData = this.signupForm.value;
    if (formData.password !== formData.repeatPassword) {
      this.signupForm.setErrors({ 'passwordMismatch': true });
      return;
    }

    if (this.signupForm.valid) {
      this.loader.showLoader();
      this.subscribtionObj.add(
        this.authService.signUp(formData.email, formData.password, formData.username).subscribe(
          (res: any) => {
            this.loader.hideLoader();
            this.snackbar.openSnackBar({
              message: res.message || "Signup Completed!",
              snacktype: SnackType.Success,
              class: 'success'
            });
            this.router.navigate(['login']);
          },
          (error: any) => {
            this.loader.hideLoader();
            this.snackbar.openSnackBar({
              message: error?.message || "Signup failed",
              snacktype: SnackType.Error,
              class: 'error'
            });
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.loader.hideLoader();
    this.subscribtionObj.unsubscribe();
  }
}

