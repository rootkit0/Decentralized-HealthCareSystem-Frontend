import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  private blockchainAccount: any;
  patients: Patient[] = [];

  constructor(private blockchainService: BlockchainService) {
    this.getBlockchainAccount();
  }

  private async getBlockchainAccount() {
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
  }

  ngOnInit(): void {
  }

  private async getPatients() {
    try {
      var doctorJSON: any = await this.blockchainService.readDoctor(this.blockchainAccount);
      var patientsAccounts: any[] = doctorJSON.assignedPatients;
      for(var patientAccount in patientsAccounts) {
        //For each entry get patient data
        var patientJSON: any = await this.blockchainService.readPatient(patientAccount);
        //Parse obtained data to recognizable object
        var patient: Patient = new Patient();
        patient.address = patientJSON.address;
        patient.name = patientJSON.name;
        patient.dateOfBirth = patientJSON.dateOfBirth;
        patient.email = patientJSON.email;
        patient.phone = patientJSON.phone;
        patient.homeAddress = patientJSON.homeAddress;
        patient.city = patientJSON.city;
        patient.postalCode = patientJSON.postalCode;
        patient.assignedDoctor = patientJSON.assignedDoctor;
        this.patients.push(patient);
      }
    }
    catch(err) {
      console.log(err);
    }
  }
}
