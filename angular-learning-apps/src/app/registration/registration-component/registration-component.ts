import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-registration-component',
  standalone: false,
  templateUrl: './registration-component.html',
  styleUrls: ['./registration-component.css']
})
export class RegistrationComponent {
  public userForm: FormGroup;
  public user: any = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      bioDetails: [null, [Validators.required]],
      dob: [null, [Validators.required]]
    })
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ bioDetails: file });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      this.user = this.userForm.value;
      console.log('formData::', this.user);

      const formData = new FormData();
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      formData.append('bioDetails', this.user.bioDetails);
      formData.append('dob', this.user.dob);
      console.log('formData::', JSON.stringify(formData));
      this.userService.registerUser(formData).subscribe((response: any) => {
        console.log('User registered successfully:', response);
      });
    }
  }

  logout() {
    this.user = null;
    this.userForm.reset();
  }
}

