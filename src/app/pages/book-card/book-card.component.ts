import { Component } from '@angular/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {

  // This method is called when the card is clicked to show the preview
  showPreview() {
    const preview = document.querySelector('.card-preview') as HTMLElement; 
    if (preview) {
      preview.style.display = 'flex'; // Show the preview
    }
  }

  // This method is called when the close icon is clicked to hide the preview
  hidePreview() {
    const preview = document.querySelector('.card-preview') as HTMLElement; 
    if (preview) {
      preview.style.display = 'none'; // Hide the preview
    }
  }
}
