import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentEditComponent } from './treatment-edit.component';

describe('TreatmentEditComponent', () => {
  let component: TreatmentEditComponent;
  let fixture: ComponentFixture<TreatmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
