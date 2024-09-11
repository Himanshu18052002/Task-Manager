import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-and-edit-admin',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './add-and-edit-admin.component.html',
  styleUrls: ['./add-and-edit-admin.component.css'],
})
export class AddAndEditAdminComponent implements OnInit {
  dialog = inject(MatDialogRef<AddAndEditAdminComponent>);
  data = inject(MAT_DIALOG_DATA);
  name: string = '';
  email: string = '';
  password: string = '';

  userForm: FormGroup = new FormGroup({
    name: new FormControl(this.name),
    email: new FormControl(this.email),
    password: new FormControl(this.password, [Validators.minLength(8)]),
  });

  ngOnInit() {
    if (this.data) {
      this.name = this.data.name || '';
      this.email = this.data.email || '';
      this.password = this.data.password || '';
    }
  }

  save() {
    if (
      this.name &&
      this.email &&
      this.password &&
      this.password.length === 8
    ) {
      this.dialog.close({
        name: this.name,
        email: this.email,
        password: this.password,
      });
    }
  }

  cancel() {
    this.dialog.close();
  }
}
