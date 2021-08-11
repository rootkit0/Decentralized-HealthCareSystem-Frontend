import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from '../models/medical-record';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  private blockchainAccount: any;
  userRole: any;
  medicalRecord: MedicalRecord = new MedicalRecord();
  bloodTypes = [
    "A+","A-","B+","B-","O+","O-","AB+","AB-"
  ];
  
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
    this.userRole = await this.blockchainService.getUserRole();
    //Get data
    var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.blockchainAccount);
    this.medicalRecord.medications = medicalRecordJSON.medications;
    this.medicalRecord.allergies = medicalRecordJSON.allergies;
    this.medicalRecord.illnesses = medicalRecordJSON.illnesses;
    this.medicalRecord.immunizations = medicalRecordJSON.immunizations;
    this.medicalRecord.bloodType = medicalRecordJSON.bloodType;
    this.medicalRecord.hasInsurance = medicalRecordJSON.hasInsurance;
    this.medicalRecord.treatmentsIds = medicalRecordJSON.treatmentsIds;
  }
}
