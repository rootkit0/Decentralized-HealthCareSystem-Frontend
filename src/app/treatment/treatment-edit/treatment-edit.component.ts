import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-treatment-edit',
  templateUrl: './treatment-edit.component.html',
  styleUrls: ['./treatment-edit.component.css']
})
export class TreatmentEditComponent implements OnInit {
  treatmentId: number = 1;
  treatment: Treatment = new Treatment();
  
  constructor(private blockchainService: BlockchainService) { }

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

  async onSubmit() {
    try {
      await this.blockchainService.updateTreatment(this.treatmentId, this.treatment.patientId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
    }
    catch(err) {
      console.log(err);
    }
  }
}
