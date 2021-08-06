import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  doctorId: any;
  patients: Patient[] = [];

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  async getPatients() {
    try {
      await this.blockchainService.readDoctor(this.doctorId);
    }
    catch(err) {
      console.log(err);
    }
  }
}
