import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../common/nav-bar/nav-bar.component';
import { UserProfilCardComponent } from '../user-profil-card/user-profil-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink,NavBarComponent,UserProfilCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
