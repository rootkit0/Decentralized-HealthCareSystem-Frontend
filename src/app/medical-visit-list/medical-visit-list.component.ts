import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalVisit } from '../models/medical-visit';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-medical-visit-list',
  templateUrl: './medical-visit-list.component.html',
  styleUrls: ['./medical-visit-list.component.css']
})
export class MedicalVisitListComponent implements OnInit {
  paramAccount: any;
  medicalVisits: MedicalVisit[] = [];
  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.paramAccount = this.activatedRoute.snapshot.params.id;
    if (this.verifyRolePermission()) {
      this.getData();
    }
  }

  private async verifyRolePermission() {
    return true;
  }

  private async getData() {

  }
}
