import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  // MatSnackBar message - Simple snack bar
  showSnackBar(message: string, action: string = '', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  // SweetAlert2 success message
  showSuccessAlert(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText: 'OK',
    });
  }

  // SweetAlert2 error message
  showErrorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: 'OK',
    });
  }

  // SweetAlert2 warning message
  showWarningAlert(title: string, text: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      confirmButtonText: 'OK',
    });
  }

  // SweetAlert2 info message
  showInfoAlert(title: string, text: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      confirmButtonText: 'Got it',
    });
  }

  // SweetAlert2 confirmation dialog
  showConfirmationAlert(title: string, text: string, confirmAction: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        confirmAction();
      }
    });
  }

  // SweetAlert2 toast message (non-blocking, top-right position)
  showToastMessage(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  // MatSnackBar success message
  showSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  // MatSnackBar error message
  showSnackBarError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  }

  // MatSnackBar warning message
  showSnackBarWarning(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-warning'],
    });
  }

  // MatSnackBar info message
  showSnackBarInfo(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-info'],
    });
  }
}
