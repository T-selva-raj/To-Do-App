import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  subscribtinObj = new Subscription();
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });


  }
  ngOnInit(): void {

  }
  onSignup() {
    const formData = this.signupForm.value;
    if (formData.password !== formData.repeatPassword) {
      this.signupForm.setErrors({ 'passwordMismatch': true });
      return;
    }
    if (this.signupForm.valid) {
      this.subscribtinObj?.add(this.authService.signUp(formData.email, formData.password).subscribe((res: any) => {
        console.log("res", res);

        this.snackbar.openSnackBar({ message: "Signup Completed..!", snacktype: SnackType.Success });
        this.router.navigate(['login']);

      }, (error: { code: string; }) => {
        if (error?.code == "auth/email-already-in-use")
          this.snackbar.openSnackBar({ message: "user already exist", snacktype: SnackType.Error });
        else this.snackbar.openSnackBar({ message: "Internal server Error", snacktype: SnackType.Error });
      }));
    }
  }
  ngOnDestroy(): void {
    this.subscribtinObj?.unsubscribe();
  }

}

