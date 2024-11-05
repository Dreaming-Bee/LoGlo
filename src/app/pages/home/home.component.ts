import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
