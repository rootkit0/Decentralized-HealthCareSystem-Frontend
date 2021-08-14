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
  treatmentId: number = 0;
  userRole: any;
  treatment: Treatment = new Treatment();
  
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.treatmentId = this.activatedRoute.snapshot.params.id;
    if(this.verifyRolePermission()) {
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
    //Get data
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

  createTreatment() {
    this.blockchainService.createTreatment(this.treatment.patientId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
  }

  updateTreatment() {
    this.blockchainService.updateTreatment(this.treatment.treatmentId, this.treatment.patientId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
  }
}
