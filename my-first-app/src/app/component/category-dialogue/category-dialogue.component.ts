import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-dialogue',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './category-dialogue.component.html',
  styleUrls: ['./category-dialogue.component.css'],
})
export class CategoryDialogueComponent {
  dialog = inject(MatDialogRef<CategoryDialogueComponent>);
  data = inject(MAT_DIALOG_DATA);
  category: string = '';

  ngOnInit() {
    if (this.data?.category) {
      this.category = this.data.category;
    }
  }

  save() {
    this.dialog.close(this.category);
  }

  cancel() {
    this.dialog.close();
  }
}
