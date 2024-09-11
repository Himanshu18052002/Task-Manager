import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TodoService } from '../../services/todo.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CategoryDialogueComponent } from '../category-dialogue/category-dialogue.component';
import { MatMenuModule } from '@angular/material/menu';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DialogueAndalertsService } from '../../services/dialogue-andalerts.service';

interface List {
  title: string;
  description: string;
  priority: string;
  category: string;
  status: boolean;
  date: Date;
  deadLine: Date;
}

@Component({
  selector: 'todo-adder',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    CategoryDialogueComponent,
    MatIconModule,
    MatMenuModule,
    FormsModule,
  ],
  templateUrl: './todo-adder.component.html',
  styleUrls: ['./todo-adder.component.css'],
})
export class TodoAdderComponent implements OnInit {
  private todoservice = inject(TodoService);
  private router = inject(Router);
  dialog = inject(MatDialog);
  dialogueAndalert = inject(DialogueAndalertsService);

  category: any[] = [];
  priority: string[] = ['High', 'Medium', 'Low'];
  url: string[] = this.router.url.split('/');
  id: string = this.router.url.split('/').pop() || '';
  updateTask: any = {};
  selectedCat = '';
  addCat = '';

  ngOnInit(): void {
    this.fetchCategory();
    if (this.url.length === 3) {
      this.fetchTodoById(this.id);
    }
  }

  fetchCategory() {
    this.todoservice.getCategories()?.subscribe({
      next: (res: any) => {
        console.log('Categories fetched:', res);
        this.category = res.cat;
      },
      error: (err: any) => {
        if (err.status === 401) this.router.navigate(['/']);
        console.error('Error fetching categories:', err);
      },
    });
  }

  todoForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    priority: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl(new Date()),
    deadLine: new FormControl(''),
    status: new FormControl(false),
  });

  fetchTodoById(url: string) {
    this.todoservice.getTodosById(url)?.subscribe({
      next: (res: any) => {
        const task = res.task;
        this.todoForm.setValue({
          title: task.title || '',
          description: task.description || '',
          priority: task.priority || '',
          category: task.category || '',
          date: task.date ? new Date(task.date) : new Date(),
          deadLine: task.deadLine ? new Date(task.deadLine) : '',
          status: task.status || false,
        });
      },
      error: (err: any) => {
        console.error('Error fetching todo by ID:', err);
      },
    });
  }

  onUpdate() {
    this.todoservice.updateTodo(this.todoForm.value, this.id).subscribe({
      next: (res: any) => {
        this.dialogueAndalert.openDialog('Task Updated succesfully');
        this.router.navigate(['/home']);
      },
    });
  }

  onSubmit() {
    const formValue = this.todoForm.value;
    formValue.deadLine = new Date(formValue.deadLine).toDateString();
    this.todoservice.setTodo(formValue as List).subscribe(() => {
      this.dialogueAndalert.openDialog('Task Added succesfully');
      this.router.navigate(['/home']);
    });
  }

  submitCategory(newCategory: string) {
    if (
      newCategory &&
      !this.category.some((cat) => cat.category === newCategory)
    ) {
      this.todoservice.setCategories(newCategory).subscribe({
        next: (res: any) => {
          this.fetchCategory();
        },
      });
      this.addCat = '';
    }
  }

  addNewCategory(cat: string) {
    console.log('Adding new category:', cat);
    this.todoservice.setCategories(cat).subscribe({
      next: (res) => {
        console.log('Category addition response:', res);
        this.fetchCategory(); // Refresh the category list
      },
      error: (err) => {
        console.error('Error adding category:', err);
      },
    });
  }
}
