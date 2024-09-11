import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from '../component/dialogue/dialogue.component';

@Injectable({
  providedIn: 'root',
})
export class DialogueAndalertsService {
  constructor(private dialog: MatDialog) {}

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '300px',
      data: {
        title: 'Alert',
        message: msg,
      },
    });

    return new Promise<boolean>((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      });
    });
  }
}
