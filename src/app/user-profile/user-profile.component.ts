import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
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
    this.getUserRole();
    this.getBlockchainAccount();
  }

  ngOnInit(): void {
  }

  private async getUserRole() {
    try {
      this.userRole = await this.blockchainService.getUserRole();
    }
    catch(err) {
      console.log(err);
    }
  }

  private async getBlockchainAccount() {
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
  }

  async updatePatient() {
    try {
      await this.blockchainService.updatePatient(this.blockchainAccount, this.patient.name, this.patient.dateOfBirth, this.patient.email, this.patient.phone, this.patient.homeAddress, this.patient.assignedDoctor);
    }
    catch(err) {
      console.log(err);
    }
  }

  async updateDoctor() {
    try {
      await this.blockchainService.updateDoctor(this.blockchainAccount, this.doctor.name, this.doctor.email, this.doctor.phone, this.doctor.assignedHospital, this.doctor.medicalSpeciality);
    }
    catch(err) {
      console.log(err);
    }
  }
}
