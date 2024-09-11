import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');
  const userService = inject(UserService);

  if (token) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
