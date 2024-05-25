import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';




@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  signupForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private snackbar: SnackbarService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])/)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });


  }

  onSignup() {
    const formData = this.signupForm.value;
    if (formData.password !== formData.repeatPassword) {
      this.signupForm.setErrors({ 'passwordMismatch': true });
      return;
    }
    if (this.signupForm.valid) {
      this.authService.SingUp(formData.email, formData.password).then(res => {
        this.snackbar.openSnackBar({ message: "Signup Completed..!", snacktype: SnackType.Success });
      }).catch(err => {
        console.log(err);
        this.snackbar.openSnackBar({ message: err.message, snacktype: SnackType.Error });
      })
    }


  }

}

