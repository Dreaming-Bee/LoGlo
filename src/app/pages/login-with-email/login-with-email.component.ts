import { Component, ElementRef, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-with-email',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-with-email.component.html',
  styleUrls: ['./login-with-email.component.css']
})
export class LoginWithEmailComponent implements AfterViewInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private vantaEffect: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  // Function to toggle password visibility
  togglePassword(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  // Function to send login request to the backend
  loginUser() {
    const loginPayload = { email: this.email, password: this.password };

    this.http.post<boolean>('http://localhost:8080/user/login', loginPayload).subscribe(
      (isValid) => {
        if (isValid) {
          alert('Login successful!');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    );
  }

  ngAfterViewInit(): void {
    // Load THREE.js dynamically
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js').then(() => {
      // Load Vanta.js Waves dynamically
      this.loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js').then(() => {
        this.initVanta();
      });
    });
  }

  private initVanta(): void {
    this.vantaEffect = (window as any).VANTA.WAVES({
      el: this.el.nativeElement.querySelector('#vanta-container'),
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x5555ff,
      shininess: 50,
      waveHeight: 20,
      waveSpeed: 0.5,
      zoom: 0.85
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

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
}
