import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/models/medical-record';
import { Treatment } from 'src/app/models/treatment';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  private medicalRecordId: any;
  private medicalRecord: MedicalRecord = new MedicalRecord();
  treatments: Treatment[] = [];

  constructor(private blockchainService: BlockchainService) {
    this.getTreatments();
    //Testing purposes
    let treatment1: Treatment = new Treatment();
    let treatment2: Treatment = new Treatment();
    treatment1.treatmentId = 1;
    treatment2.treatmentId = 2;
    this.treatments.push(treatment1);
    this.treatments.push(treatment2);
  }

  ngOnInit(): void {
  }

  async getTreatments() {
    try {
      this.medicalRecord = await this.blockchainService.readMedicalRecord(this.medicalRecordId);
      for(let i=0; i<this.medicalRecord.treatmentsIds.length; ++i) {
        this.treatments.push(await this.blockchainService.readTreatment(this.medicalRecord.treatmentsIds[i]));
      }
    }
    catch(err) {
      console.log(err);
    }
  }
}
