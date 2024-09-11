import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authenticateInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  console.log(token ? 'Authorization header set' : 'No token found');
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err.status);
      if (err.status == 401) {
        localStorage.clear();
        router.navigate(['/']);
      }
      return throwError(() => err);
    })
  );
};
