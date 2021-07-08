import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordDetailComponent } from './medical-record-detail.component';

describe('MedicalRecordDetailComponent', () => {
  let component: MedicalRecordDetailComponent;
  let fixture: ComponentFixture<MedicalRecordDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalRecordDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
