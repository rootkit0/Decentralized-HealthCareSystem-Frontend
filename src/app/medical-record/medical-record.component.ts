import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecord } from '../models/medical-record';
import { UserRoles } from '../models/user-roles';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  paramAccount: any;
  userRole: string = "";
  medicalRecord: MedicalRecord = new MedicalRecord();
  bloodTypes = [
    "A+","A-","B+","B-","O+","O-","AB+","AB-"
  ];
  
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  async ngOnInit() {
    this.paramAccount = this.activatedRoute.snapshot.params.id;
    this.userRole = await this.blockchainService.readUserRole();
    if(await this.verifyRolePermission()) {
      this.getData();
    }
  }

  private async verifyRolePermission() {
    if(this.userRole == UserRoles.DOCTOR || this.userRole == UserRoles.ADMIN) {
      return true;
    }
    else {
      //Patients can only read his data
      if(this.paramAccount == await this.blockchainService.getDefaultAccount()) {
        return true;
      }
    }
    return false;
  }

  private async getData() {
    var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.paramAccount);
    this.medicalRecord.medicalRecordId = this.paramAccount;
    this.medicalRecord.medications = medicalRecordJSON.medications;
    this.medicalRecord.allergies = medicalRecordJSON.allergies;
    this.medicalRecord.illnesses = medicalRecordJSON.illnesses;
    this.medicalRecord.immunizations = medicalRecordJSON.immunizations;
    this.medicalRecord.bloodType = medicalRecordJSON.bloodType;
    this.medicalRecord.hasInsurance = medicalRecordJSON.hasInsurance;
    this.medicalRecord.treatmentsIds = medicalRecordJSON.treatmentsIds;
    this.medicalRecord.medicalVisitsIds = medicalRecordJSON.medicalVisitsIds;
  }

  updateMedicalRecord() {
    this.blockchainService.updateMedicalRecord(this.medicalRecord.medicalRecordId, this.medicalRecord.medications, this.medicalRecord.allergies, this.medicalRecord.illnesses, this.medicalRecord.immunizations, this.medicalRecord.bloodType, this.medicalRecord.hasInsurance, this.medicalRecord.treatmentsIds, this.medicalRecord.medicalVisitsIds);
  }
}
