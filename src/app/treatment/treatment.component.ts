import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from '../models/treatment';
import { UserRoles } from '../models/user-roles';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  treatmentId: any;
  createTreatmentView: boolean = false;
  blockchainAccount: any;
  userRole: any;
  treatment: Treatment = new Treatment();
  fromDate: Date = new Date();
  toDate: Date = new Date();
  fromDateFormControl: FormControl = new FormControl();
  toDateFormControl: FormControl = new FormControl();
  
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  async ngOnInit() {
    this.treatmentId = this.activatedRoute.snapshot.params.id;
    this.blockchainAccount = await this.blockchainService.getDefaultAccount();
    this.userRole = await this.blockchainService.readUserRole();
    //Given parameter is an account
    if(this.treatmentId.startsWith("0x") && this.treatmentId.length == 42) {
      if(await this.verifyRolePermission(true)) {
        this.createTreatmentView = true;
        //Fill patient and doctor accounts
        this.treatment.patientId = this.treatmentId;
        this.treatment.doctorId = this.blockchainAccount;
      }
    }
    //Given parameter is an id
    else {
      if(await this.verifyRolePermission(false)) {
        this.getData();
      }
    }
  }

  private async verifyRolePermission(paramAccount: boolean) {
    if(this.userRole == UserRoles.DOCTOR || this.userRole == UserRoles.ADMIN) {
      return true;
    }
    else {
      if(paramAccount) {
        //Patients can't create treatments
        return false;
      }
      else {
        //Patients can only read it's treatments
        var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.blockchainAccount);
        var treatmentsIds: number[] = medicalRecordJSON.treatmentsIds;
        if(treatmentsIds.includes(this.treatmentId)) {
          return true;
        }
      }
    }
    return false;
  }

  private async getData() {
    var treatmentJSON: any = await this.blockchainService.readTreatment(this.treatmentId);;
    this.treatment.treatmentId = this.treatmentId;
    this.treatment.patientId = treatmentJSON.patientId;
    this.treatment.doctorId = treatmentJSON.doctorId;
    this.treatment.diagnosis = treatmentJSON.diagnosis;
    this.treatment.medicine = treatmentJSON.medicine;
    //Set dates
    this.fromDate.setTime(treatmentJSON.fromDate);
    this.toDate.setTime(treatmentJSON.toDate);
    //Set form controls
    this.fromDateFormControl.setValue(this.fromDate);
    this.toDateFormControl.setValue(this.toDate);
    this.treatment.bill = treatmentJSON.bill;
  }

  updateTreatment() {
    this.treatment.fromDate = new Date(this.fromDateFormControl.value).getTime();
    this.treatment.toDate = new Date(this.toDateFormControl.value).getTime();
    this.blockchainService.updateTreatment(this.treatmentId, this.treatment.patientId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
  }

  createTreatment() {
    this.treatment.fromDate = new Date(this.fromDateFormControl.value).getTime();
    this.treatment.toDate = new Date(this.toDateFormControl.value).getTime();
    this.blockchainService.createTreatment(this.treatmentId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
  }
}
