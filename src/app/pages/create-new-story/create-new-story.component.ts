import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { StoryService } from '../../service/story.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-new-story',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-new-story.component.html',
  styleUrls: ['./create-new-story.component.css']
})
export class CreateNewStoryComponent implements OnInit {
  storyForm!: FormGroup;
  tags: string[] = [];
  newTag: any;
  selectedImage!: File;

  public story :any={
    title: "",
    description: "",
    postedBy: "",
    img: "",
    mCharacters: "",
    category: "",
    copyright: "",
    language:"",
    audience:"",
    tags: []
  }

  public createStory(){
    this.story.tags = this.tags;
    this.http.post("http://localhost:8080/story/add-story",this.story).subscribe((data)=>{
      console.log('Response from backend:', data);
        alert("Story Added!!!!");
    })
  }
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient
    // private storyService: StoryService
  ) {}

  ngOnInit() {
    this.storyForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(5000)]],
      mCharacters: [null, Validators.required],
      category: [null, Validators.required],
      img: [null, Validators.required],
      postedBy: [null, Validators.required],
      copyright:[null, Validators.required]
    });
  }

  add(event: any): void {
    const value = this.newTag?.trim();
    if (value) {
      this.tags.push(value);
      this.newTag = ''; 
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


  onCoverUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const coverImage = document.getElementById('cover-image') as HTMLImageElement;
        coverImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // submitForm(): void {
  //   if (this.storyForm.valid) {
  //     this.createStory();
  //   } else {
  //     alert("Please fill all required fields!")
  //   }
  // }
}
