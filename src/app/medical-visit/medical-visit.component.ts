import { Component, OnInit } from '@angular/core';
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
    userRole: any;
    medicalVisit: MedicalVisit = new MedicalVisit();
    medicalVisitDate: Date = new Date();

    constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

    ngOnInit(): void {
      this.medicalVisitId = this.activatedRoute.snapshot.params.id;
      if (this.verifyRolePermission()) {
        //Given parameter is an account then activate create view
        if (this.medicalVisitId.startsWith("0x") && this.medicalVisitId.length == 42) {
          this.createMedicalVisitView = true;
        }
        else {
          this.getData();
        }
      }
    }

    verifyRolePermission(): boolean {
      return true;
    }

    async getData() {
      //Get user role
      this.userRole = await this.blockchainService.readUserRole();
    }
}
