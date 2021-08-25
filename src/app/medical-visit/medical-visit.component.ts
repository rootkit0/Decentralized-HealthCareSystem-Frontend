import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalVisit } from '../models/medical-visit';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-medical-visit',
  templateUrl: './medical-visit.component.html',
  styleUrls: ['./medical-visit.component.css']
})
export class MedicalVisitComponent implements OnInit {
  medicalVisitId: any;
  createMedicalVisitView: boolean = false;
  userRole: any;
  medicalVisit: MedicalVisit = new MedicalVisit();
  medicalVisitDate: Date = new Date();
  medicalVisitDateFormControl = new FormControl();

  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.medicalVisitId = this.activatedRoute.snapshot.params.id;
    //Given parameter is an account then activate create view
    if (this.medicalVisitId.startsWith("0x") && this.medicalVisitId.length == 42) {
      this.createMedicalVisitView = true;
      //Set patient ID
      this.medicalVisit.patientId = this.medicalVisitId;
      //Set doctor ID
      this.getAssignedDoctor();
    }
    else {
      this.medicalVisit.medicalVisitId = this.medicalVisitId;
      this.getData();
    }
  }

  private async getAssignedDoctor() {
    var patientJSON: any = await this.blockchainService.readPatient(this.medicalVisitId);
    this.medicalVisit.doctorId = patientJSON.assignedDoctorId;
  }

  private async getData() {
    //Get data
    var medicalVisitJSON: any = await this.blockchainService.readMedicalVisit(this.medicalVisitId);;
    this.medicalVisit.patientId = medicalVisitJSON.patientId;
    this.medicalVisit.doctorId = medicalVisitJSON.doctorId;
    //Set date form control
    this.medicalVisitDate.setTime(medicalVisitJSON.dateVisit);
    this.medicalVisitDateFormControl.setValue(this.medicalVisitDate);
    this.medicalVisit.hourVisit = medicalVisitJSON.hourVisit;
    this.medicalVisit.symptoms = medicalVisitJSON.symptoms;
    this.medicalVisit.urgency = medicalVisitJSON.urgency;
  }

  createMedicalVisit() {
    this.medicalVisit.dateVisit = new Date(this.medicalVisitDateFormControl.value).getTime();
    this.blockchainService.createMedicalVisit(this.medicalVisit.patientId, this.medicalVisit.doctorId, this.medicalVisit.dateVisit, this.medicalVisit.hourVisit, this.medicalVisit.symptoms, this.medicalVisit.urgency);
  }
}
