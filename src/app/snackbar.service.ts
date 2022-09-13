import { SnackbarComponent } from './snackbar/snackbar.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar) {}
  openSnackBar(snackbarData: string, backgroundClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: snackbarData,
      panelClass: ['shopping-snack-bar-container', backgroundClass],
    });
  }
}
