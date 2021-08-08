import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/models/medical-record';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-medical-record-edit',
  templateUrl: './medical-record-edit.component.html',
  styleUrls: ['./medical-record-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {
  private blockchainAccount: any;
  medicalRecord: MedicalRecord = new MedicalRecord();

  bloodTypes = [
    "A+","A-","B+","B-","O+","O-","AB+","AB-"
  ];

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

  async updateMedicalRecord() {
    try {
      await this.blockchainService.updateMedicalRecord(this.blockchainAccount, this.medicalRecord.medications, this.medicalRecord.allergies, this.medicalRecord.illnesses, this.medicalRecord.immunizations, this.medicalRecord.bloodType, this.medicalRecord.hasInsurance, this.medicalRecord.treatmentsIds);
    }
    catch(err) {
      console.log(err);
    }
  }

}
