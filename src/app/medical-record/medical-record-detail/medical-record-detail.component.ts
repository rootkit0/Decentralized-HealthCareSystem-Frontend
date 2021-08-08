import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/models/medical-record';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-medical-record-detail',
  templateUrl: './medical-record-detail.component.html',
  styleUrls: ['./medical-record-detail.component.css']
})
export class MedicalRecordDetailComponent implements OnInit {
  private blockchainAccount: any;
  medicalRecord: MedicalRecord = new MedicalRecord();
  
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
