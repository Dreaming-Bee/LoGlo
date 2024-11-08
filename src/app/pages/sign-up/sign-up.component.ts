declare var google: any;
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {


  public user: any = {
    email: "",
    username: "",
    birthday: "",
    pronounce: "",
    password: ""
  };

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: "96465137934-c05dil70iujmbo6hpr6ichfbnrqloop7.apps.googleusercontent.com", 
      callback: this.onSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "medium" } 
    );
  }

  onSignIn(response: any): void {
    const credential = response.credential;

    // Decode the ID token and extract user info
    const userInfo = JSON.parse(atob(credential.split('.')[1]));

    // Populate the user object with relevant fields from Google user data
    this.user.email = userInfo.email || '';
    this.user.username = userInfo.name || '';

    // Optional: If you have a user profile picture field, you can set it here
    // this.user.profilePicture = userInfo.picture || null;

    console.log('User info:', this.user);
    
    // Now send the user data to the backend
    this.createUser();
  }

  public createUser() {
    this.http.post("http://localhost:8080/user/add-user", this.user).subscribe((data) => {
      console.log('Response from backend:', data);
      alert("You have successfully signed up !!!");

      this.router.navigate(['/home']); 
    });
  }

  // onSignIn(response: any): void {
  //   const credential = response.credential;

  //   const userInfo = JSON.parse(atob(credential.split('.')[1])); 
  //   console.log('ID: ' + userInfo.sub);
  //   console.log('Name: ' + userInfo.name);
  //   console.log('Image URL: ' + userInfo.picture);
  //   console.log('Email: ' + userInfo.email);
    
  // }
}
