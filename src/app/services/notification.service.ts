import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public notify(message: string, timeout: number = 4000): void {
    this.snackBar.open(message, 'OK', {
      duration: timeout,
    });
  }
}
