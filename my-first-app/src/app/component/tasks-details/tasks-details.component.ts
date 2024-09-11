import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { DialogueAndalertsService } from '../../services/dialogue-andalerts.service';

interface List {
  _id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: boolean;
  date: Date;
  deadLine: Date;
}

@Component({
  selector: 'app-tasks-details',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule, MatIcon, MatFabButton],
  templateUrl: './tasks-details.component.html',
  styleUrl: './tasks-details.component.css',
})
export class TasksDetailsComponent {
  router = inject(Router);
  todoServices = inject(TodoService);
  dialogueandAlert = inject(DialogueAndalertsService);
  listItem: List = {
    _id: '',
    title: '',
    description: '',
    priority: '',
    category: '',
    status: false,
    date: new Date(),
    deadLine: new Date(),
  };

  url: string = this.router.url.split('/').pop() ?? '0';

  ngOnInit(): void {
    this.getListItem();
  }

  async deleteThis() {
    let index = this.url;
    let con = this.dialogueandAlert.openDialog(
      'Do you want to delete the Task?'
    );
    if (await con) {
      this.todoServices.deleteTasks(index);
      alert('Task Deleted Succesfully taking you to the Main page');
      this.dialogueandAlert.openDialog('Deleted Succesfully');
      this.router.navigate(['']);
    }
  }

  updateThis() {
    let index = this.url;
    this.router.navigate(['/add-todo', index]);
  }

  async getListItem() {
    console.log(this.url);
    await this.todoServices.getTodosById(this.url)?.subscribe({
      next: (res: any) => {
        console.log(res.task);
        this.listItem = res.task;
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.router.navigate(['/']);
          console.log('An error occured ', err);
        }
      },
    });
  }
}
