import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  userRole: any;
  treatment: Treatment = new Treatment();
  fromDate: Date = new Date();
  toDate: Date = new Date();
  fromDateFormControl = new FormControl();
  toDateFormControl = new FormControl();
  
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  async ngOnInit() {
    this.treatmentId = this.activatedRoute.snapshot.params.id;
    await this.getUserRole();
    //Given parameter is an account then activate create view
    if (this.treatmentId.startsWith("0x") && this.treatmentId.length == 42) {
      if(this.userRole == UserRoles.DOCTOR || this.userRole == UserRoles.ADMIN) {
        this.createTreatmentView = true;
      }
    }
    else {
      this.getData();
    }
  }

  private async getUserRole() {
    //Get user role
    this.userRole = await this.blockchainService.readUserRole();
  }

  private async getData() {
    if (!this.createTreatmentView) {
      //Set treatmentId from param
      this.treatment.treatmentId = this.treatmentId;
      //Get data
      var treatmentJSON: any = await this.blockchainService.readTreatment(this.treatmentId);;
      this.treatment.patientId = treatmentJSON.patientId;
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
    else {
      //Set patientId from param
      this.treatment.patientId = this.treatmentId;
    }
    //Set doctorId to who is editing actually
    this.treatment.doctorId = await this.blockchainService.getDefaultAccount();
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
