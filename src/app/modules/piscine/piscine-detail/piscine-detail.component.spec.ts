import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiscineDetailComponent } from './piscine-detail.component';

describe('PiscineDetailComponent', () => {
  let component: PiscineDetailComponent;
  let fixture: ComponentFixture<PiscineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiscineDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiscineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
