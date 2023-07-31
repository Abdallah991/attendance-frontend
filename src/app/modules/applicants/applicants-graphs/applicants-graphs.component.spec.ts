import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsGraphsComponent } from './applicants-graphs.component';

describe('ApplicantsGraphsComponent', () => {
  let component: ApplicantsGraphsComponent;
  let fixture: ComponentFixture<ApplicantsGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsGraphsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
