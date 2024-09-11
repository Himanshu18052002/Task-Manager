import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { formatDistanceToNow, isDate, parseISO } from 'date-fns';

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
  selector: 'app-list-element',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css'],
})
export class ListElementComponent {
  route = inject(Router);
  todoservices = inject(TodoService);
  isHovering = false;

  @Input() listItem: List = {
    _id: '',
    title: '',
    description: '',
    priority: '',
    category: '',
    status: false,
    date: new Date(),
    deadLine: new Date(),
  };

  @Output() checkChange = new EventEmitter<{
    _id: string;
    checked: boolean;
  }>();

  tasksDetails() {
    this.route.navigate([`/tasks-details/${this.listItem._id}`]);
  }

  getRemainingTime(): string {
    if (this.listItem && this.listItem.deadLine) {
      const deadlineDate = isDate(this.listItem.deadLine)
        ? this.listItem.deadLine
        : new Date(this.listItem.deadLine);
      return formatDistanceToNow(deadlineDate, { addSuffix: true });
    }
    return '';
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const checked = checkbox.checked;
    this.checkChange.emit({ _id: this.listItem._id, checked });
  }
}
