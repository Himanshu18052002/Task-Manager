import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Correct import
import { MatIconModule } from '@angular/material/icon'; // Correct import
import { DialogueAndalertsService } from '../../services/dialogue-andalerts.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddAndEditAdminComponent } from '../add-and-edit-admin/add-and-edit-admin.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class AdminPageComponent implements OnInit {
  userService = inject(UserService);
  dialogueAndAlert = inject(DialogueAndalertsService);
  dialog = inject(MatDialog);
  router = inject(Router);

  users: any[] = [];
  userID = '';

  ngOnInit(): void {
    this.getUsers();
  }

  openDialog(data: { name: string; email: string; password: string }) {
    const dialogRef = this.dialog.open(AddAndEditAdminComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser(result); // Pass the result directly
      }
    });
  }

  async deleteThis(_id: string) {
    const con = await this.dialogueAndAlert.openDialog(
      'Are you sure you want to delete the User?'
    );

    if (con) {
      this.userService.deleteUser(_id).subscribe(() => {
        this.dialogueAndAlert.openDialog('Deleted successfully');
        this.getUsers();
      });
    }
  }

  updateThis(user: {
    _id: string;
    name: string;
    email: string;
    password: string;
  }) {
    this.userID = user._id;
    this.openDialog(user);
  }

  async addThis() {
    const con = await this.dialogueAndAlert.openDialog(
      'Do you want to add a new user? You will be redirected to the register page.'
    );

    if (con) {
      this.router.navigate(['/register']);
    }
  }

  updateUser(data: { name: string; email: string; password: string }) {
    if (this.userID) {
      this.userService.updateUser(this.userID, data).subscribe(() => {
        this.dialogueAndAlert.openDialog('Updated successfully');
      });
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => (this.users = res.users),
      error: (err) => console.error(err),
    });
  }
}
