import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  paramAccount: any;
  patients: Patient[] = [];

  constructor(private activatedRoute: ActivatedRoute, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.paramAccount = this.activatedRoute.snapshot.params.id;
    this.getData();
  }

  private async getData() {
    var doctorJSON: any = await this.blockchainService.readDoctor(this.paramAccount);
    var patientsAccounts: any[] = doctorJSON.assignedPatients;
    for(var patientAccount in patientsAccounts) {
      //For each entry get patient data
      var patientJSON: any = await this.blockchainService.readPatient(patientAccount);
      //Parse obtained data to recognizable object
      var patient: Patient = new Patient();
      patient.patientId = patientJSON.patientId;
      patient.name = patientJSON.name;
      patient.dateOfBirth = patientJSON.dateOfBirth;
      patient.email = patientJSON.email;
      patient.phone = patientJSON.phone;
      patient.homeAddress = patientJSON.homeAddress;
      patient.city = patientJSON.city;
      patient.postalCode = patientJSON.postalCode;
      patient.assignedDoctorId = patientJSON.assignedDoctorId;
      this.patients.push(patient);
    }
  }
}
