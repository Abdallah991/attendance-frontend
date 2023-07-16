import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterButtonComponent } from './sorter-button.component';

describe('SorterButtonComponent', () => {
  let component: SorterButtonComponent;
  let fixture: ComponentFixture<SorterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorterButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
