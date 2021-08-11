import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { UserRoles } from '../models/user-roles';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private blockchainAccount: any;
  userRole: any;
  patient: Patient = new Patient();
  doctor: Doctor = new Doctor();

  constructor(private blockchainService: BlockchainService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  private async getData() {
    //Get blockchain account
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
    //Get user role
    this.userRole = await this.blockchainService.getUserRole();
    //Get data
    if(this.userRole == UserRoles.PATIENT) {
      var patientJSON: any = await this.blockchainService.readPatient(this.blockchainAccount);
      this.patient.patientId = patientJSON.patientId;
      this.patient.name = patientJSON.name;
      this.patient.dateOfBirth = patientJSON.dateOfBirth;
      this.patient.email = patientJSON.email;
      this.patient.phone = patientJSON.phone;
      this.patient.homeAddress = patientJSON.homeAddress;
      this.patient.city = patientJSON.city;
      this.patient.postalCode = patientJSON.postalCode;
      this.patient.assignedDoctorId = patientJSON.assignedDoctorId;
    }
    else if(this.userRole == UserRoles.DOCTOR) {
      var doctorJSON: any = await this.blockchainService.readDoctor(this.blockchainAccount);
      this.doctor.doctorId = doctorJSON.doctorId;
      this.doctor.name = doctorJSON.name;
      this.doctor.email = doctorJSON.email;
      this.doctor.phone = doctorJSON.phone;
      this.doctor.homeAddress = doctorJSON.homeAddress;
      this.doctor.city = doctorJSON.city;
      this.doctor.postalCode = doctorJSON.postalCode;
      this.doctor.medicalSpeciality = doctorJSON.medicalSpeciality;
      this.doctor.assignedHospital = doctorJSON.assignedHospital;
      this.doctor.assignedPatientsIds = doctorJSON.assignedPatientsIds;
    }
    else {
      console.log("You're admin!");
    }
  }

  async updatePatient() {
    try {
      await this.blockchainService.updatePatient(this.patient.patientId, this.patient.name, this.patient.dateOfBirth, this.patient.email, this.patient.phone, this.patient.homeAddress, this.patient.city, this.patient.postalCode);
    }
    catch(err) {
      console.log(err);
    }
  }

  async updateDoctor() {
    try {
      await this.blockchainService.updateDoctor(this.doctor.doctorId, this.doctor.name, this.doctor.email, this.doctor.phone, this.doctor.homeAddress, this.doctor.city, this.doctor.postalCode, this.doctor.medicalSpeciality, this.doctor.assignedHospital);
    }
    catch(err) {
      console.log(err);
    }
  }
}
