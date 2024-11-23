declare var google: any;
declare var VANTA: any;

import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements AfterViewInit {

  public user: any = {
    email: "",
    username: "",
    birthday: "",
    pronounce: "",
    password: ""
  };

  private vantaEffect: any;

  constructor(private http: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: "96465137934-c05dil70iujmbo6hpr6ichfbnrqloop7.apps.googleusercontent.com", 
      callback: this.onSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "medium" }
    );
  }

  ngAfterViewInit(): void {
    // Load Vanta.js effect
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js').then(() => {
      this.loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js').then(() => {
        this.initVanta();
      });
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      this.renderer.appendChild(document.body, script);
    });
  }

  private initVanta(): void {
    this.vantaEffect = VANTA.WAVES({
      el: this.el.nativeElement.querySelector('#your-element-selector'),
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00
    });
  }

  onSignIn(response: any): void {
    const credential = response.credential;

    // Decode the ID token and extract user info
    const userInfo = JSON.parse(atob(credential.split('.')[1]));

    // Populate the user object with relevant fields from Google user data
    this.user.email = userInfo.email || '';
    this.user.username = userInfo.name || '';

    console.log('User info:', this.user);
    
    // Now send the user data to the backend
    this.createUser();
  }

  public createUser() {
    this.http.post("http://localhost:8080/user/add-user", this.user).subscribe((data) => {
      console.log('Response from backend:', data);
      alert("You have successfully signed up!");

      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
}
