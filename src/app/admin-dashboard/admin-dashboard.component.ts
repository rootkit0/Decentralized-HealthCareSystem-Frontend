import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { UserRoles } from '../models/user-roles';
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
    var doc = new Doctor();
    doc.name = "Name";
    doc.email = "example@gmail.com";
    doc.medicalSpeciality = "Neurologist";
    doc.assignedHospital = "Vall d'Hebron";
    this.doctors.push(doc);
    var pat = new Patient();
    pat.name = "Name";
    pat.email = "example@gmail.com";
    pat.homeAddress = "Street 1, Flat 2";
    pat.city = "Lleida";
    pat.assignedDoctor = "0x00";
    this.patients.push(pat);
  }

  ngOnInit(): void {
  }

  updateUserRole(): void {
    this.blockchainService.updateUserRole(this.newRoleAddress, this.newRole);
  }

  getPatients(): void {

  }

  getDoctors(): void {
    
  }
}
