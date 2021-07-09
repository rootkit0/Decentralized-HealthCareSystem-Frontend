import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/models/medical-record';

@Component({
  selector: 'app-medical-record-detail',
  templateUrl: './medical-record-detail.component.html',
  styleUrls: ['./medical-record-detail.component.css']
})
export class MedicalRecordDetailComponent implements OnInit {
  medicalRecord: MedicalRecord;
  
  constructor() {
    this.medicalRecord = new MedicalRecord;
  }

  ngOnInit(): void {
  }

}
