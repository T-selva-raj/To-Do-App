import { Component } from '@angular/core';
import { ContactUsService } from '../services/contactus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactFrom: FormGroup;
  constructor(

    private fb: FormBuilder,
    // private contactService: ContactUsService
  ) {
    this.contactFrom = this.fb.group({
      name: ['', Validators.required, Validators.maxLength(15)],
      email: ['', Validators.required, Validators.email],
      description: ['', Validators.required, Validators.maxLength(100)]
    })
  }

  onSubmit() {

  }

}
