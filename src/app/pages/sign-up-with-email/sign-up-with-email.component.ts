import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sign-up-with-email',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './sign-up-with-email.component.html',
  styleUrl: './sign-up-with-email.component.css'
})
export class SignUpWithEmailComponent {


  public user: any = {
    email: "",
    username: "",
    birthday: "",
    pronounce: "",
    password: ""
};

  constructor(private http: HttpClient, private router: Router) {} 

  public createUser() {
    this.http.post("http://localhost:8080/user/add-user", this.user).subscribe((data) => {
      console.log('Response from backend:', data);
      alert("You have successfully signed up !!!");

      this.router.navigate(['/home']); 
    });
  }

  password: string = '';
  repassword: string = '';
  errorMessage: string = '';

  togglePassword(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  validatePassword() {
    if (this.password !== this.repassword) {
      this.errorMessage = 'Passwords do not match!';
    } else {
      this.errorMessage = '';
      alert('Form submitted successfully!');
    }
  }
}
