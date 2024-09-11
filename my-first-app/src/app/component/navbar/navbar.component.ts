import { Component, inject, OnInit } from '@angular/core';
import {
  MatButton,
  MatButtonModule,
  MatFabButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';
import { DialogueAndalertsService } from '../../services/dialogue-andalerts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatButtonModule,
    MatFabButton,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  dialoge = inject(DialogueAndalertsService);
  admin: boolean = false;
  show = false;
  email: '' | any = '';

  ngOnInit(): void {
    let a = localStorage.getItem('access_token');
    let b: string = a?.split('.')[1] || '';
    this.email = JSON.parse(atob(b));
    console.log(this.email.id);
    this.userService.getUser().subscribe({
      next: (res) => {
        this.admin = res.user.admin;
        console.log(res);
      },
    });
  }

  setShow() {
    this.show = !this.show;
  }

  routeToLists() {
    this.router.navigate(['/home']);
  }
  routerToadd() {
    this.router.navigate(['/add-todo']);
  }
  routetoAdmin() {
    this.router.navigate(['/admin']);
  }
  async logoutMe() {
    let con = this.dialoge.openDialog('Are you sure want to logout?');
    if (await con) {
      localStorage.removeItem('access_token');
      this.router.navigate(['/']);
    }
  }
}
