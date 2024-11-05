import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilCardComponent } from './user-profil-card.component';

describe('UserProfilCardComponent', () => {
  let component: UserProfilCardComponent;
  let fixture: ComponentFixture<UserProfilCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
