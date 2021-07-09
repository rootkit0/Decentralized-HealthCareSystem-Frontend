import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/models/medical-record';

@Component({
  selector: 'app-medical-record-edit',
  templateUrl: './medical-record-edit.component.html',
  styleUrls: ['./medical-record-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {
  medicalRecord: MedicalRecord;

  bloodTypes = [
    "A+","A-","B+","B-","O+","O-","AB+","AB-"
  ];

  constructor() {
    this.medicalRecord = new MedicalRecord();
  }
  
  ngOnInit(): void {
  }

  onSubmit(): void {
    
  }

}
