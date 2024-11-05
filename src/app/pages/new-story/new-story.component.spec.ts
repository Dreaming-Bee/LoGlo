import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStoryComponent } from './new-story.component';

describe('NewStoryComponent', () => {
  let component: NewStoryComponent;
  let fixture: ComponentFixture<NewStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
