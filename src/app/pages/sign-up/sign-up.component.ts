declare var google: any;
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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

    const userInfo = JSON.parse(atob(credential.split('.')[1])); 
    console.log('ID: ' + userInfo.sub);
    console.log('Name: ' + userInfo.name);
    console.log('Image URL: ' + userInfo.picture);
    console.log('Email: ' + userInfo.email);
    
  }
}
