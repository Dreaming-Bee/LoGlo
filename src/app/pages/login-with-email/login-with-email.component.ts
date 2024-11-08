import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-with-email',
  standalone: true,
  imports: [FormsModule,NgIf],  // Only keep FormsModule if ngModel is used
  templateUrl: './login-with-email.component.html',
  styleUrls: ['./login-with-email.component.css']
})
export class LoginWithEmailComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Function to toggle password visibility
  togglePassword(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  // Function to send login request to the backend
  loginUser() {
    const loginPayload = { email: this.email, password: this.password };

    // Send the login request
    this.http.post<boolean>('http://localhost:8080/user/login', loginPayload).subscribe(
      (isValid) => {
        if (isValid) {
          // If login is successful, navigate to the home page
          alert('Login successful!');
          this.router.navigate(['/home']);
        } else {
          // If invalid credentials, show error message
          this.errorMessage = 'Invalid email or password.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    );
  }
}
