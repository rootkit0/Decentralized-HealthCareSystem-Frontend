import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalVisit } from '../models/medical-visit';
import { UserRoles } from '../models/user-roles';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-medical-visit',
  templateUrl: './medical-visit.component.html',
  styleUrls: ['./medical-visit.component.css']
})
export class MedicalVisitComponent implements OnInit {
  medicalVisitId: any;
  createMedicalVisitView: boolean = false;
  blockchainAccount: any;
  userRole: any;
  medicalVisit: MedicalVisit = new MedicalVisit();
  medicalVisitDate: Date = new Date();
  medicalVisitDateFormControl = new FormControl();

  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  async ngOnInit() {
    this.medicalVisitId = this.activatedRoute.snapshot.params.id;
    this.blockchainAccount = await this.blockchainService.getDefaultAccount();
    this.userRole = await this.blockchainService.readUserRole();
    //Given parameter is an account
    if (this.medicalVisitId.startsWith("0x") && this.medicalVisitId.length == 42) {
      if(await this.verifyRolePermission(true)) {
        this.createMedicalVisitView = true;
        //Fill patient and doctor accounts
        this.medicalVisit.patientId = this.medicalVisitId;
        this.getAssignedDoctor();
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
        //Patients can only create visits for himself
        if(this.medicalVisitId == this.blockchainAccount) {
          return true;
        }
      }
      else {
        //Patients can only read visits created by himself
        var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.blockchainAccount);
        var medicalVisitsIds: number[] = medicalRecordJSON.medicalVisitsIds;
        if(medicalVisitsIds.includes(this.medicalVisitId)) {
          return true;
        }
      }
    }
    return false;
  }

  private async getAssignedDoctor() {
    var patientJSON: any = await this.blockchainService.readPatient(this.medicalVisitId);
    this.medicalVisit.doctorId = patientJSON.assignedDoctorId;
  }

  private async getData() {
    var medicalVisitJSON: any = await this.blockchainService.readMedicalVisit(this.medicalVisitId);
    this.medicalVisit.medicalVisitId = this.medicalVisitId;
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
