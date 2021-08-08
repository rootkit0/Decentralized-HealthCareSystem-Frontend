import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.css']
})
export class TreatmentDetailComponent implements OnInit {
  private blockchainAccount: any;
  treatmentId: number = 1;
  treatment: Treatment = new Treatment();
  
  constructor(private blockchainService: BlockchainService) {
    this.getBlockchainAccount();
    this.getData();
  }

  private async getBlockchainAccount() {
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
  }

  ngOnInit(): void {
  }

  private async getData() {
    try {
      var treatmentJSON: any = await this.blockchainService.readTreatment(this.treatmentId);
      this.treatment.treatmentId = treatmentJSON.treatmentId;
      this.treatment.patientId = treatmentJSON.patientId;
      this.treatment.doctorId = treatmentJSON.doctorId;
      this.treatment.diagnosis = treatmentJSON.diagnosis;
      this.treatment.medicine = treatmentJSON.medicine;
      this.treatment.fromDate = treatmentJSON.fromDate;
      this.treatment.toDate = treatmentJSON.toDate;
      this.treatment.bill = treatmentJSON.bill;
    }
    catch(err) {
      console.log(err);
    }
  }
}
