import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface List {
  title: string;
  description: string;
  priority: string;
  category: string;
  status: boolean;
  date: Date;
  deadLine: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private base_url = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<any> {
    return this.http.get<List[]>(`${this.base_url}/all-tasks`);
  }

  // Add a new todo
  setTodo(listItem: List): Observable<any> {
    return this.http.post(`${this.base_url}/add-tasks`, listItem);
  }

  // Update an existing todo
  updateTodo(listItem: List, id: string): Observable<any> {
    return this.http.put(`${this.base_url}/edit-tasks/${id}`, listItem);
  }

  // Get todo by ID
  getTodosById(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/task-details/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching todo by ID:', error);
        return of(null); // Return null in case of error
      })
    );
  }

  // Delete a todo
  deleteTasks(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/delete-tasks/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting todo:', error);
        return of(null); // Return null in case of error
      })
    );
  }

  // Add a new category
  setCategories(name: string): Observable<any> {
    debugger;
    return this.http.post(`${this.base_url}/add-category`, { name });
  }

  // Get all categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.base_url}/categories`).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return of([]);
      })
    );
  }
}
