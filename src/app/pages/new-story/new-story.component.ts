import { Component } from '@angular/core';

@Component({
  selector: 'app-new-story',
  standalone: true,
  imports: [],
  templateUrl: './new-story.component.html',
  styleUrl: './new-story.component.css'
})
export class NewStoryComponent {
  // title: string = 'Untitled Part 1';

  // updateTitle(event: Event) {
  //   const element = event.target as HTMLElement;
  //   this.title = element.innerText;
  // }

  // saveTitle() {
    // this.http.post('YOUR_BACKEND_URL', { title: this.title })
    //   .subscribe(response => {
    //     console.log('Title saved:', response);
    //   });
  // }
  title: string = 'Untitled Part 1';

  // Optional: Method to process input if needed
  updateTitle(event: Event) {
    // Additional processing can be done here
  }

  paragraphText: string = 'Type your text';
  updateParagraph(event: Event) {
    
  }

}
