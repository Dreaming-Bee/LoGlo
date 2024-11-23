import { NgIf } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

declare var VANTA: any;

@Component({
  selector: 'app-sign-up-with-email',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './sign-up-with-email.component.html',
  styleUrls: ['./sign-up-with-email.component.css']
})
export class SignUpWithEmailComponent implements AfterViewInit, OnDestroy {

  public user: any = {
    email: "",
    username: "",
    birthday: "",
    pronounce: "",
    password: ""
  };

  password: string = '';
  repassword: string = '';
  errorMessage: string = '';
  private vantaEffect: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // Initialize Vanta Effect on the element after view is loaded
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js').then(() => {
      this.loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js').then(() => {
        this.initVanta();
      });
    });
  }

  private initVanta(): void {
    this.vantaEffect = (window as any).VANTA.WAVES({
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

  public createUser() {
    this.http.post("http://localhost:8080/user/add-user", this.user).subscribe((data) => {
      console.log('Response from backend:', data);
      alert("You have successfully signed up !!!");
      this.router.navigate(['/home']); 
    });
  }

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
