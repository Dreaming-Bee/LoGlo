import { Component } from '@angular/core';

@Component({
  selector: 'app-create-new-story',
  standalone: true,
  imports: [],
  templateUrl: './create-new-story.component.html',
  styleUrl: './create-new-story.component.css'
})
export class CreateNewStoryComponent {

  onCoverUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const coverImage = document.getElementById('cover-image') as HTMLImageElement;
        coverImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
