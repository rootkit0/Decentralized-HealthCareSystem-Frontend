import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.css']
})
export class TreatmentDetailComponent implements OnInit {
  treatmentId: number = 1;
  treatment: Treatment = new Treatment();
  
  constructor(private blockchainService: BlockchainService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  async getData() {
    try {
      console.log(await this.blockchainService.readTreatment(this.treatmentId));
    }
    catch(err) {
      console.log(err);
    }
  }
}
