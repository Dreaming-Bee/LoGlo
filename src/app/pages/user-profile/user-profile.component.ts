import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../common/nav-bar/nav-bar.component';
import { UserProfilCardComponent } from '../user-profil-card/user-profil-card.component';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink,NavBarComponent,UserProfilCardComponent,NgIf,NgStyle,NgFor],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  

  showPalette: boolean = false; // Toggle visibility of color palette
  colors: string[] = ['#a7489f', '#9767c4', '#7d84e1', '#37B6FF', '#00e2e3', '#a6f88d', '#f9f871']; // Array of colors

  ngOnInit(): void {
    this.applyStoredColor(); // Apply stored color on initialization
  }

  // Toggle the color palette visibility when the icon is clicked
  toggleColorPalette() {
    this.showPalette = !this.showPalette;
  }

  // Change the background color of the header when a color is selected
  changeBackgroundColor(color: string) {
    const headerBackground = document.querySelector('.header-background') as HTMLElement;

    // If the selected color is not the default color, change to selected color
    if (headerBackground) {
      if (color !== '#37B6FF') {
        headerBackground.style.backgroundColor = color;
      } else {
        // If the default color is selected, keep it as the background color
        headerBackground.style.backgroundColor = '#37B6FF';
      }

      // Store the selected color in localStorage
      localStorage.setItem('headerBackgroundColor', color);
    }

    this.showPalette = false; // Hide the palette after a color is selected
  }

  // Apply the stored background color from localStorage
  applyStoredColor() {
    const storedColor = localStorage.getItem('headerBackgroundColor');
    if (storedColor) {
      const headerBackground = document.querySelector('.header-background') as HTMLElement;
      if (headerBackground) {
        headerBackground.style.backgroundColor = storedColor;
      }
    } else {
      // If no color is stored, apply the default color
      const headerBackground = document.querySelector('.header-background') as HTMLElement;
      if (headerBackground) {
        headerBackground.style.backgroundColor = '#37B6FF'; // Default color
      }
    }
  }
}
