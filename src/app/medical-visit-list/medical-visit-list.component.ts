import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalVisit } from '../models/medical-visit';
import { UserRoles } from '../models/user-roles';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-medical-visit-list',
  templateUrl: './medical-visit-list.component.html',
  styleUrls: ['./medical-visit-list.component.css']
})
export class MedicalVisitListComponent implements OnInit {
  paramAccount: any;
  userRole: string = "";
  medicalVisits: MedicalVisit[] = [];
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
    if(this.userRole == UserRoles.DOCTOR || this.userRole == UserRoles.ADMIN) {
      return true;
    }
    else {
      //Patients can only view his data
      if(this.paramAccount == await this.blockchainService.getDefaultAccount()) {
        return true;
      }
    }
    return false;
  }

  private async getData() {
    var medicalRecordJSON: any = await this.blockchainService.readMedicalRecord(this.paramAccount);
    var medicalVisitsIds: number[] = medicalRecordJSON.medicalVisitsIds;
    for (var medicalVisitId of medicalVisitsIds) {
      //For each treatmentid get treatment data
      var tmp: number = +medicalVisitId;
      var medicalVisitJSON: any = await this.blockchainService.readMedicalVisit(tmp);
      //Parse obtained data to recognizable object
      var medicalVisit: MedicalVisit = new MedicalVisit();
      medicalVisit.medicalVisitId = tmp;
      medicalVisit.patientId = medicalVisitJSON.patientId;
      medicalVisit.doctorId = medicalVisitJSON.doctorId;
      medicalVisit.dateVisit = medicalVisitJSON.dateVisit;
      medicalVisit.hourVisit = medicalVisitJSON.hourVisit;
      medicalVisit.symptoms = medicalVisitJSON.symptoms;
      medicalVisit.urgency = medicalVisitJSON.urgency;
      this.medicalVisits.push(medicalVisit);
    }
  }
}
