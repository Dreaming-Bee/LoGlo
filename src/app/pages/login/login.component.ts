declare var google: any;
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: "96465137934-c05dil70iujmbo6hpr6ichfbnrqloop7.apps.googleusercontent.com", // Replace with your actual client ID
      callback: this.onSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "medium" } 
    );
  }

  onSignIn(response: any): void {
    const credential = response.credential;

    const userInfo = JSON.parse(atob(credential.split('.')[1])); 
    console.log('ID: ' + userInfo.sub);
    console.log('Name: ' + userInfo.name);
    console.log('Image URL: ' + userInfo.picture);
    console.log('Email: ' + userInfo.email);
    
  }
  
}
