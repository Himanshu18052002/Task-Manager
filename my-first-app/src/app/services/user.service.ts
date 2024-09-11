import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogueAndalertsService } from './dialogue-andalerts.service';

interface loginCred {
  email: string;
  password: string;
}

interface registerCred {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_url = 'http://localhost:8000/api/v1';
  private http = inject(HttpClient);
  private router = inject(Router);
  dialogandAlertService = inject(DialogueAndalertsService);
  login(data: loginCred) {
    this.http
      .post<{
        access_token: any;
        token: string | { access_token: string };
      }>(this.base_url + '/login', data)
      .subscribe({
        next: (res) => {
          const token = res.access_token;
          localStorage.setItem('access_token', token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.dialogandAlertService.openDialog('Wrong credentials');
          console.log(
            'An error occured in the UI part inside login function ',
            err
          );
        },
      });
  }
  register(data: registerCred): boolean {
    this.http.post(this.base_url + '/register', data).subscribe({
      next: () => {
        alert('User registerd succesfully');
        this.router.navigate(['/']);
      },
      error: (err) =>
        console.error(' An error occured in the UI section of register ', err),
    });
    return true;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.base_url + '/users');
  }

  getUser(): Observable<any> {
    return this.http.get(this.base_url + '/user');
  }

  updateUser(id: string, data: {}): Observable<any> {
    return this.http.put(this.base_url + '/edit-user-details/' + id, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.base_url + '/delete-user/' + id);
  }
}
