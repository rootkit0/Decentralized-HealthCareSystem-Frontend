import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from '../models/treatment';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  treatmentId: any;
  userRole: any;
  treatment: Treatment = new Treatment();
  createTreatmentView: boolean = false;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.treatmentId = this.activatedRoute.snapshot.params.id;
    if (this.verifyRolePermission()) {
      //Given parameter is an account then activate create view
      if (this.treatmentId.startsWith("0x") && this.treatmentId.length == 42) {
        this.createTreatmentView = true;
      }
      this.getData();
    }
  }

  private async verifyRolePermission() {
    //Testing purposes
    return true;
  }

  private async getData() {
    //Get user role
    this.userRole = await this.blockchainService.readUserRole();
    if (!this.createTreatmentView) {
      //Set treatmentId from param
      this.treatment.treatmentId = this.treatmentId;
      //Get data
      var treatmentJSON: any = await this.blockchainService.readTreatment(this.treatmentId);;
      this.treatment.patientId = treatmentJSON.patientId;
      this.treatment.diagnosis = treatmentJSON.diagnosis;
      this.treatment.medicine = treatmentJSON.medicine;
      this.treatment.fromDate = treatmentJSON.fromDate;
      this.treatment.toDate = treatmentJSON.toDate;
      this.treatment.bill = treatmentJSON.bill;
      //Number to datetime
      this.fromDate.setTime(this.treatment.fromDate);
      this.toDate.setTime(this.treatment.toDate);
    }
    else {
      //Set patientId from param
      this.treatment.patientId = this.treatmentId;
    }
    //Set doctorId to who is editing actually
    this.treatment.doctorId = await this.blockchainService.getDefaultAccount();
  }

  updateTreatment() {
    //Datetime to number
    this.treatment.fromDate = this.fromDate.getTime();
    this.treatment.toDate = this.toDate.getTime();
    this.blockchainService.updateTreatment(this.treatmentId, this.treatment.patientId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
  }

  createTreatment() {
    //Datetime to number
    this.treatment.fromDate = this.fromDate.getTime();
    this.treatment.toDate = this.toDate.getTime();
    this.blockchainService.createTreatment(this.treatmentId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
  }

  clearData() {
    this.treatment = new Treatment();
  }
}
