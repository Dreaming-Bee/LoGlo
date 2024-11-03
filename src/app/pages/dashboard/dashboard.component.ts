import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
