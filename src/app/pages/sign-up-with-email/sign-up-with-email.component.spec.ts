import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWithEmailComponent } from './sign-up-with-email.component';

describe('SignUpWithEmailComponent', () => {
  let component: SignUpWithEmailComponent;
  let fixture: ComponentFixture<SignUpWithEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpWithEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpWithEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
