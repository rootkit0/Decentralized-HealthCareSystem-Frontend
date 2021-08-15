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

  ngOnInit(): void {
    this.paramAccount = this.activatedRoute.snapshot.params.id;
    this.getUserRole();
    if(this.verifyRolePermission()) {
      this.getData();
    }
  }

  private async getUserRole() {
    this.userRole = await this.blockchainService.readUserRole();
  }

  private async verifyRolePermission() {
    //Testing purposes
    return true;
  }

  private async getData() {
    //Get data
    var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.paramAccount);
    this.medicalRecord.medications = medicalRecordJSON.medications;
    this.medicalRecord.allergies = medicalRecordJSON.allergies;
    this.medicalRecord.illnesses = medicalRecordJSON.illnesses;
    this.medicalRecord.immunizations = medicalRecordJSON.immunizations;
    this.medicalRecord.bloodType = medicalRecordJSON.bloodType;
    this.medicalRecord.hasInsurance = medicalRecordJSON.hasInsurance;
    this.medicalRecord.treatmentsIds = medicalRecordJSON.treatmentsIds;
  }

  updateMedicalRecord() {
    this.blockchainService.updateMedicalRecord(this.medicalRecord.medicalRecordId, this.medicalRecord.medications, this.medicalRecord.allergies, this.medicalRecord.illnesses, this.medicalRecord.immunizations, this.medicalRecord.bloodType, this.medicalRecord.hasInsurance, this.medicalRecord.treatmentsIds);
  }
}
