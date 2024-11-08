import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {

  @Input()
  public storyInfo:any;

  public selectedStory: any = null;

  // This method is called when the card is clicked to show the preview
  showPreview(story: any) {
    this.selectedStory = story; 
    const preview = document.querySelector('.card-preview') as HTMLElement; 
    if (preview) {
      preview.style.display = 'flex'; // Show the preview
    }
  }

  // This method is called when the close icon is clicked to hide the preview
  hidePreview() {
    this.selectedStory = null;
    const preview = document.querySelector('.card-preview') as HTMLElement; 
    if (preview) {
      preview.style.display = 'none'; // Hide the preview
    }
  }
}
