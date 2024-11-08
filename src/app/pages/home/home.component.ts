import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';
import { NavBarComponent } from '../../common/nav-bar/nav-bar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,BookCardComponent,NavBarComponent,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.loadStoryInfo();
  }

  public storyList:any = [];

  loadStoryInfo(){
    fetch("http://localhost:8080/story/get-all")
    .then(res=>res.json())
    .then(data => {
      this.storyList= data;
      console.log(this.storyList)
    })
  }

}
