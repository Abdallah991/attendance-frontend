import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsStatusComponent } from './applicants-status.component';

describe('ApplicantsStatusComponent', () => {
  let component: ApplicantsStatusComponent;
  let fixture: ComponentFixture<ApplicantsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
