import { Component, OnInit } from '@angular/core';
import { Treatment } from '../models/treatment';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  private blockchainAccount: any;
  userRole: any;
  treatment: Treatment = new Treatment();
  
  constructor(private blockchainService: BlockchainService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  private async getData() {
    //Get blockchain account
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
    //Get user role
    this.userRole = await this.blockchainService.readUserRole();
    //Get data
    var treatmentJSON: any = await this.blockchainService.readTreatment(1);
    this.treatment.treatmentId = treatmentJSON.treatmentId;
    this.treatment.patientId = treatmentJSON.patientId;
    this.treatment.doctorId = treatmentJSON.doctorId;
    this.treatment.diagnosis = treatmentJSON.diagnosis;
    this.treatment.medicine = treatmentJSON.medicine;
    this.treatment.fromDate = treatmentJSON.fromDate;
    this.treatment.toDate = treatmentJSON.toDate;
    this.treatment.bill = treatmentJSON.bill;
  }

}
