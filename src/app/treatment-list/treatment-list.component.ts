import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from '../models/treatment';
import { UserRoles } from '../models/user-roles';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  paramAccount: any;
  userRole: string = "";
  treatments: Treatment[] = [];
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
    var treatmentsIds: number[] = medicalRecordJSON.treatmentsIds;
    for(var treatmentId of treatmentsIds) {
      //For each treatmentid get treatment data
      var tmp: number = +treatmentId;
      var treatmentJSON: any = await this.blockchainService.readTreatment(tmp);
      //Parse obtained data to recognizable object
      var treatment: Treatment = new Treatment();
      treatment.treatmentId = tmp;
      treatment.patientId = treatmentJSON.patientId;
      treatment.doctorId = treatmentJSON.doctorId;
      treatment.diagnosis = treatmentJSON.diagnosis;
      treatment.medicine = treatmentJSON.medicine;
      treatment.fromDate = treatmentJSON.fromDate;
      treatment.toDate = treatmentJSON.toDate;
      treatment.bill = treatmentJSON.bill;
      this.treatments.push(treatment);
    }
  }
}
