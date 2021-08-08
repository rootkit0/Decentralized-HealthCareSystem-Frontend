import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  private medicalRecordId: any;
  treatments: Treatment[] = [];

  constructor(private blockchainService: BlockchainService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  private async getData() {
    try {
      var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.medicalRecordId);
      var treatmentIds: number[] = medicalRecordJSON.treatmentsIds;
      for(var treatmentId of treatmentIds) {
        var treatmentJSON: any = await this.blockchainService.readTreatment(treatmentId);
        var treatment: Treatment = new Treatment();
        treatment.treatmentId = treatmentJSON.treatmentId;
        treatment.patientId = treatmentJSON.patientId;
        treatment.doctorId = treatmentJSON.doctorId;
        treatment.diagnosis = treatmentJSON.diagnosis;
        treatment.medicine = treatmentJSON.medicine;
        treatment.fromDate = treatmentJSON.fromDate;
        treatment.toDate = treatmentJSON.toDate;
        treatment.bill = treatmentJSON.bill;
        this.treatments.push(treatment);
      }
    }
    catch(err) {
      console.log(err);
    }
  }
}
