import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalVisitListComponent } from './medical-visit-list.component';

describe('MedicalVisitListComponent', () => {
  let component: MedicalVisitListComponent;
  let fixture: ComponentFixture<MedicalVisitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalVisitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalVisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
