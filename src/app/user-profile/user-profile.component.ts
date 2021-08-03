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
  userRole: any;
  patient: Patient = new Patient();
  doctor: Doctor = new Doctor();

  constructor(private blockchainService: BlockchainService) {
    this.getUserRole();
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

}
