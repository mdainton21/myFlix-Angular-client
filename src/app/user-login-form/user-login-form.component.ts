// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

constructor(
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  this.FetchApiDataService.userLogin(this.userData).subscribe(
    (result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('User logged in successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('login failed', 'OK', {
        duration: 2000
      });
    });
}
}
