import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { UserRoles } from '../models/user-roles';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3!: Web3;
  //Declare contracts
  private authContract: any;
  private healthcareContract: any;
  //Declare contracts deploy addresses
  private authContractDeployedAt = "0xB06eE509e7202164Dff4941F1725b55a60583078";
  private healthcareContractDeployedAt = "0x42c1231Ed1E6A23917974E5Ea2C155De9954601B";

  constructor(private authService: AuthService, private router: Router) {
    this.connectBlockchain();
  }

  private async connectBlockchain() {
    //Modern dapp browsers
    if(typeof window.ethereum !== "undefined") {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        this.deployContracts();
      }
      catch(error) {
          console.log(error);
      }
    }
    //Legacy dapp browsers
    else if(typeof window.web3 !== "undefined") {
      this.web3 = new Web3(window.web3.currentProvider);
      try {
        this.deployContracts();
      }
      catch(error) {
        console.log(error);
      }
    }
    //External blockchain provider
    else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      //Try to connect to local blockchain network
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      try {
        this.deployContracts();
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  private async deployContracts() {
    this.authContract = new this.web3.eth.Contract(
      [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"}],"name":"loginUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"}],"name":"readUserRole","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"}],"name":"signupUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"oldPasswordHash","type":"string"},{"internalType":"string","name":"newPasswordHash","type":"string"}],"name":"updateUserPassword","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"},{"internalType":"string","name":"newUserRole","type":"string"}],"name":"updateUserRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
      this.authContractDeployedAt
    );
    this.healthcareContract = new this.web3.eth.Contract(
      [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"doctorId","type":"string"}],"name":"createDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"},{"internalType":"string","name":"doctorId","type":"string"},{"internalType":"uint256","name":"dateVisit","type":"uint256"},{"internalType":"uint256","name":"hourVisit","type":"uint256"},{"internalType":"string","name":"symptoms","type":"string"},{"internalType":"bool","name":"urgency","type":"bool"}],"name":"createMedicalVisit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"}],"name":"createPatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"},{"internalType":"string","name":"doctorId","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"name":"createTreatment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDoctorAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPatientAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"doctorId","type":"string"}],"name":"readDoctor","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"},{"internalType":"address[]","name":"assignedPatientsIds","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"medicalRecordId","type":"string"}],"name":"readMedicalRecord","outputs":[{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"},{"internalType":"uint256[]","name":"treatmentsIds","type":"uint256[]"},{"internalType":"uint256[]","name":"medicalVisitsIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_medicalVisitId","type":"uint256"}],"name":"readMedicalVisit","outputs":[{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"uint256","name":"dateVisit","type":"uint256"},{"internalType":"uint256","name":"hourVisit","type":"uint256"},{"internalType":"string","name":"symptoms","type":"string"},{"internalType":"bool","name":"urgency","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"}],"name":"readPatient","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"},{"internalType":"address","name":"assignedDoctorId","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_treatmentId","type":"uint256"}],"name":"readTreatment","outputs":[{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"doctorId","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"}],"name":"updateDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"medicalRecordId","type":"string"},{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"},{"internalType":"uint256[]","name":"treatmentsIds","type":"uint256[]"},{"internalType":"uint256[]","name":"medicalVisitsIds","type":"uint256[]"}],"name":"updateMedicalRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"}],"name":"updatePatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_treatmentId","type":"uint256"},{"internalType":"string","name":"doctorId","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"name":"updateTreatment","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      this.healthcareContractDeployedAt
    );
  }

  public async getDefaultAccount() {
    var ret: any;
    await this.web3.eth.getAccounts().then(
      data => {
        ret = data[0];
      }
    );
    return ret;
  }

  //Auth contract methods
  public async signupUser(idCardNumber: string, healthCardId: string, passwordHash: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      var res: boolean = await this.authContract.methods.signupUser(idCardNumber, healthCardId, passwordHash).send({from: defaultAccount, gasPrice: "0"});
      if(res) {
        //Create healthcare instance depending on role
        const userRole = await this.readUserRole();
        if(userRole == UserRoles.PATIENT) {
          await this.createPatient(defaultAccount);
        }
        if(userRole == UserRoles.DOCTOR) {
          await this.createDoctor(defaultAccount);
        }
        this.router.navigate(["/login"]);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  public async loginUser(idCardNumber: string, healthCardId: string, passwordHash: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      var res: boolean = await this.authContract.methods.loginUser(idCardNumber, healthCardId, passwordHash).send({from: defaultAccount, gasPrice: "0"});
      if(res) {
        //Generate auth token if success
        this.authService.generateToken(idCardNumber + healthCardId);
        this.router.navigate(["/user-profile"]);
        window.location.reload();
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  public async updateUserPassword(oldPasswordHash: string, newPasswordHash: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      var res: boolean = await this.authContract.methods.updateUserPassword(oldPasswordHash, newPasswordHash).send({from: defaultAccount, gasPrice: "0"});
      if(res) {
        //Deauth user
        this.authService.removeToken();
        window.location.reload();
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  public async updateUserRole(userId: string, userRole: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      var res: boolean = await this.authContract.methods.updateUserRole(userId, userRole).send({from: defaultAccount, gasPrice: "0"});
      if(res) {
        //Create healthcare instance depending on new role
        const userRole = await this.readUserRoleById(userId);
        if(userRole == UserRoles.PATIENT) {
          await this.createPatient(userId);
        }
        if(userRole == UserRoles.DOCTOR) {
          await this.createDoctor(userId);
        }
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  public async readUserRole() {
    var defaultAccount: any = await this.getDefaultAccount();
    return await this.authContract.methods.readUserRole(defaultAccount).call();
  }

  public async readUserRoleById(userId: string) {
    return await this.authContract.methods.readUserRole(userId).call();
  }

  //Healthcare contract methods
  public async createPatient(patientId: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.createPatient(patientId).send({from: defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async readPatient(patientId: string) {
    return await this.healthcareContract.methods.readPatient(patientId).call();
  }

  public async updatePatient( patientId: string,
                              name: string,
                              dateOfBirth: number,
                              email: string,
                              phone: string,
                              homeAddress: string,
                              city: string,
                              postalCode: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.updatePatient(patientId, name, dateOfBirth, email, phone, homeAddress, city, postalCode).send({from: defaultAccount, gasPrice: "0"});  
    }
    catch(err) {
      console.log(err);
    }
  }

  public async createDoctor(doctorId: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.createDoctor(doctorId).send({from: defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async readDoctor(doctorId: string) {
    return await this.healthcareContract.methods.readDoctor(doctorId).call();
  }

  public async updateDoctor(  doctorId: string,
                              name: string,
                              email: string,
                              phone: string,
                              homeAddress: string,
                              city: string,
                              postalCode: string,
                              medicalSpeciality: string,
                              assignedHospital: string) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.updateDoctor(doctorId, name, email, phone, homeAddress, city, postalCode, medicalSpeciality, assignedHospital).send({from: defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async readMedicalRecord(medicalRecordId: string) {
    return await this.healthcareContract.methods.readMedicalRecord(medicalRecordId).call();
  }

  public async updateMedicalRecord( medicalRecordId: string,
                                    medications: string,
                                    allergies: string,
                                    illnesses: string,
                                    immunizations: string,
                                    bloodType: string,
                                    hasInsurance: boolean,
                                    treatmentsIds: number[],
                                    medicalVisitsIds: number[]) {
      try {
        var defaultAccount: any = await this.getDefaultAccount();
        await this.healthcareContract.methods.updateMedicalRecord(medicalRecordId, medications, allergies, illnesses, immunizations, bloodType, hasInsurance, treatmentsIds, medicalVisitsIds).send({from: defaultAccount, gasPrice: "0"});  
      }
      catch(err) {
        console.log(err);
      }
  }

  public async createTreatment( patientId: string,
                                doctorId: string,
                                diagnosis: string,
                                medicine: string,
                                fromDate: number,
                                toDate: number,
                                bill: number) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.createTreatment(patientId, doctorId, diagnosis, medicine, fromDate, toDate, bill).send({from: defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async readTreatment(treatmentId: number) {
    return await this.healthcareContract.methods.readTreatment(treatmentId).call();
  }

  public async updateTreatment( treatmentId: number,
                                patientId: string,
                                doctorId: string,
                                diagnosis: string,
                                medicine: string,
                                fromDate: number,
                                toDate: number,
                                bill: number) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.updateTreatment(treatmentId, patientId, doctorId, diagnosis, medicine, fromDate, toDate, bill).send({from: defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async createMedicalVisit(  patientId: string,
                                    doctorId: string,
                                    dateVisit: number,
                                    hourVisit: string,
                                    symptoms: string,
                                    urgency: boolean) {
    try {
      var defaultAccount: any = await this.getDefaultAccount();
      await this.healthcareContract.methods.createMedicalVisit(patientId, doctorId, dateVisit, hourVisit, symptoms, urgency).send({ from: defaultAccount, gasPrice: "0" });
    }
    catch (err) {
      console.log(err);
    }
  }

  public async readMedicalVisit(medicalVisitId: number) {
    return await this.healthcareContract.methods.readMedicalVisit(medicalVisitId).call();
  }

  public async getPatientAddresses() {
    const userRole = await this.readUserRole();
    if(userRole == UserRoles.ADMIN) {
      return await this.healthcareContract.methods.getPatientAddresses().call();
    }
  }

  public async getDoctorAddresses() {
    const userRole = await this.readUserRole();
    if(userRole == UserRoles.ADMIN) {
      return await this.healthcareContract.methods.getDoctorAddresses().call();
    }
  }
}
