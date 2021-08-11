import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  newRoleAddress: any;
  newRole: string = "";
  
  constructor(private blockchainService: BlockchainService) {
    this.getPatients();
    this.getDoctors();
  }

  ngOnInit(): void {
  }

  async updateUserRole() {
    try {
      await this.blockchainService.updateUserRole(this.newRoleAddress, this.newRole);
    }
    catch(err) {
      console.log(err);
    }
  }

  private async getPatients() {
    try {
      var patientAddresses: any[] = await this.blockchainService.getPatientAddresses();
      for(var patientAddress in patientAddresses) {
        //For each entry get patient data
        var patientJSON: any = await this.blockchainService.readPatient(patientAddress);
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
    catch(err) {
      console.log(err);
    }
  }

  async getDoctors() {
    try {
      var doctorAddresses: any[];
      doctorAddresses = await this.blockchainService.getDoctorAddresses();
      for(var doctorAddress in doctorAddresses) {
        //For each entry get doctor data
        var doctorJSON: any;
        doctorJSON = await this.blockchainService.readDoctor(doctorAddress);
        //Parse obtained data to recognizable object
        var doctor: Doctor = new Doctor();
        doctor.doctorId = doctorJSON.doctorId;
        doctor.name = doctorJSON.name;
        doctor.email = doctorJSON.email;
        doctor.phone = doctorJSON.phone;
        doctor.homeAddress = doctorJSON.homeAddress;
        doctor.city = doctorJSON.city;
        doctor.postalCode = doctorJSON.postalCode;
        doctor.medicalSpeciality = doctorJSON.medicalSpeciality;
        doctor.assignedHospital = doctorJSON.assignedHospital;
        doctor.assignedPatientsIds = doctorJSON.assignedPatientsIds;
        this.doctors.push(doctor);
      }
    }
    catch(err) {
      console.log(err);
    }
  }
}
