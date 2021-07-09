import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/models/medical-record';

@Component({
  selector: 'app-medical-record-create',
  templateUrl: './medical-record-create.component.html',
  styleUrls: ['./medical-record-create.component.css']
})
export class MedicalRecordCreateComponent implements OnInit {
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
