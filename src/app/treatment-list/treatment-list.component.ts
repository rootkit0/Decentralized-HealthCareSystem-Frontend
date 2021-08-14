import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from '../models/treatment';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  paramAccount: any;
  treatments: Treatment[] = [];
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.paramAccount = this.activatedRoute.snapshot.params.id;
    if(this.verifyRolePermission()) {
      this.getData();
    }
  }

  private async verifyRolePermission() {
    return true;
  }

  private async getData() {
    var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.paramAccount);
    var treatmentsIds: number[] = medicalRecordJSON.treatmentsIds;
    for(var treatmentId in treatmentsIds) {
      //For each treatmentid get treatment data
      var tmp: number = +treatmentId;
      var treatmentJSON: any = await this.blockchainService.readTreatment(tmp);
      //Parse obtained data to recognizable object
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
}
