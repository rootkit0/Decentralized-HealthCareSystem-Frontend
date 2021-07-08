import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCreateComponent } from './treatment-create.component';

describe('TreatmentCreateComponent', () => {
  let component: TreatmentCreateComponent;
  let fixture: ComponentFixture<TreatmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
