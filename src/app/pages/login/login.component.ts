import { Component, ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

declare var google: any;
declare var VANTA: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  private vantaEffect: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // Load Google Sign-In script dynamically
    this.loadScript('https://accounts.google.com/gsi/client').then(() => {
      this.initializeGoogleSignIn();
    });

    // Load THREE.js dynamically
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js').then(() => {
      // Load Vanta.js Waves dynamically
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

  private initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: "96465137934-c05dil70iujmbo6hpr6ichfbnrqloop7.apps.googleusercontent.com", // Replace with your actual client ID
      callback: this.onSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "medium" }
    );
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

  onSignIn(response: any): void {
    const credential = response.credential;
    const userInfo = JSON.parse(atob(credential.split('.')[1])); 
    console.log('ID: ' + userInfo.sub);
    console.log('Name: ' + userInfo.name);
    console.log('Image URL: ' + userInfo.picture);
    console.log('Email: ' + userInfo.email);
  }

  ngOnDestroy(): void {
    // Cleanup Vanta effect
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
}
