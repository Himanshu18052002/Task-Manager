import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

interface loginCred {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  private userServices = inject(UserService);
  private route = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userServices.getUser()?.subscribe({
      next: (res: HttpResponse<any>) => {
        console.log(res);
        this.route.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.route.navigate(['/']);
          console.log(
            ' An error occured while getting user detail in the Component part ',
            err
          );
        }
      },
    });
  }

  navigateMe() {
    this.route.navigate(['/register']);
  }

  onSubmit() {
    this.userServices.login(this.form.value as loginCred);
  }
}
