import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-treatment-create',
  templateUrl: './treatment-create.component.html',
  styleUrls: ['./treatment-create.component.css']
})
export class TreatmentCreateComponent implements OnInit {
  treatment: Treatment = new Treatment();
  
  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      await this.blockchainService.createTreatment(this.treatment.patientId, this.treatment.doctorId, this.treatment.diagnosis, this.treatment.medicine, this.treatment.fromDate, this.treatment.toDate, this.treatment.bill);
    }
    catch(err) {
      console.log(err);
    }
  }

}
