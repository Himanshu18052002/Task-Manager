import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { ListElementComponent } from '../list-element/list-element.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

interface todoList {
  _id: string;
  index: number;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: boolean;
  date: Date;
  deadLine: Date;
}

interface Category {
  category: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ListElementComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  title = 'todo-app';

  selectSortBy: string = 'Priority';
  selectSortOrder: string = 'Ascending';
  selectCategory: string = '';

  // Observable properties
  private todoData$: BehaviorSubject<todoList[]> = new BehaviorSubject<
    todoList[]
  >([]);
  filteredList$: Observable<todoList[]> = this.todoData$.asObservable();
  category$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  private todoService = inject(TodoService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // Fetch and set todo data
    this.todoService.getTodos()?.subscribe({
      next: (res) => {
        this.todoData$.next(res.tasks);
        this.sortList();
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/']);
        }
        console.error('An error occurred while getting tasks ', err);
        console.log('Error details:', err.message, err.stack);
      },
    });

    // Fetch and set categories
    this.todoService.getCategories()?.subscribe({
      next: (res) => {
        this.category$.next(res.cat);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/']);
        }
        console.error('An error occurred while getting categories ', err);
        console.log('Error details:', err.message, err.stack);
      },
    });
  }

  getUser() {
    this.userService.getUser()?.subscribe({
      next: (res: HttpResponse<any>) => {
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/']);
          console.log(
            ' An error occured while getting user detail in the Component part ',
            err
          );
        }
      },
    });
  }

  onCheckChange(event: { _id: string; checked: boolean }) {
    this.todoData$.pipe(take(1)).subscribe((todoData) => {
      const updatedList = todoData.map((element) => {
        if (element._id === event._id) {
          element.status = event.checked;
          this.todoService.updateTodo(element, element._id).subscribe({
            next: () => console.log('Todo updated successfully'),
            error: (err: any) =>
              console.error('An error occurred while updating the todo', err),
          });
        }
        return element;
      });
      this.todoData$.next(updatedList);
      this.sortCategory(); // Reapply category filter and sorting
    });
  }

  sortCategory(): void {
    this.todoData$.pipe(take(1)).subscribe((todoData) => {
      let filteredList = todoData;
      if (this.selectCategory) {
        filteredList = todoData.filter(
          (element) => element.category === this.selectCategory
        );
      }
      this.filteredList$ = of(filteredList); // Update filteredList$
      this.sortList(); // Apply sorting after filtering
    });
  }

  sortList(): void {
    this.filteredList$.pipe(take(1)).subscribe((todoData) => {
      const sortOrder = this.selectSortOrder === 'Ascending' ? 1 : -1;
      let sortedList = [...todoData];

      switch (this.selectSortBy) {
        case 'Priority':
          sortedList.sort((a, b) => {
            const prioritize: { [key: string]: number } = {
              Low: 0,
              Medium: 1,
              High: 2,
            };
            return (
              (prioritize[a.priority] - prioritize[b.priority]) * sortOrder
            );
          });
          break;
        case 'Status':
          sortedList.sort(
            (a, b) =>
              (a.status === b.status ? 0 : a.status ? -1 : 1) * sortOrder
          );
          break;
        case 'Date':
          sortedList.sort((a, b) => {
            const dateDiff =
              new Date(a.deadLine).getTime() - new Date(b.deadLine).getTime();
            return dateDiff * sortOrder;
          });
          break;
        default:
          console.error('An error occurred: Unsupported sort option');
      }

      this.filteredList$ = of(sortedList); // Update sorted list
    });
  }
}
