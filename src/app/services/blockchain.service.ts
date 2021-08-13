import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { AuthService } from './auth.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3!: Web3;

  //Declare default account
  public defaultAccount: any;
  //Declare contracts
  private authContract: any;
  private healthcareContract: any;
  //Declare contracts deploy addresses
  private authContractDeployedAt = "0x29a762103057243055F3211db8e3a570dfCD8f8b";
  private healthcareContractDeployedAt = "0x9b31f18604FA69b730D11Dc6D4F0eA8dB53dc676";

  constructor() {
    this.connectBlockchain();
  }

  private async connectBlockchain() {
    //Modern dapp browsers
    if(typeof window.ethereum !== "undefined") {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        await this.getDefaultAccount();
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
        await this.getDefaultAccount();
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
        await this.getDefaultAccount();
        this.deployContracts();
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  private async deployContracts() {
    this.authContract = new this.web3.eth.Contract(
      [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authList","outputs":[{"internalType":"address","name":"userId","type":"address"},{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"},{"internalType":"string","name":"userRole","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"}],"name":"loginUser","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"}],"name":"readUserRole","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"}],"name":"signupUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"oldPasswordHash","type":"string"},{"internalType":"string","name":"newPasswordHash","type":"string"}],"name":"updateUserPassword","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"},{"internalType":"string","name":"newUserRole","type":"string"}],"name":"updateUserRole","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      this.authContractDeployedAt
    );
    this.healthcareContract = new this.web3.eth.Contract(
      [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"createDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createMedicalRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createPatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"},{"internalType":"string","name":"doctorId","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"name":"createTreatment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDoctorAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPatientAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"doctorId","type":"string"}],"name":"readDoctor","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"},{"internalType":"address[]","name":"assignedPatientsIds","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"medicalRecordId","type":"string"}],"name":"readMedicalRecord","outputs":[{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"},{"internalType":"uint256[]","name":"treatmentsIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"}],"name":"readPatient","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"},{"internalType":"address","name":"assignedDoctorId","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_treatmentId","type":"uint256"}],"name":"readTreatment","outputs":[{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"doctorId","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"}],"name":"updateDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"medicalRecordId","type":"string"},{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"},{"internalType":"uint256[]","name":"treatmentsIds","type":"uint256[]"}],"name":"updateMedicalRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"patientId","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"city","type":"string"},{"internalType":"string","name":"postalCode","type":"string"}],"name":"updatePatient","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      this.healthcareContractDeployedAt
    );
  }

  public async getDefaultAccount() {
    await this.web3.eth.getAccounts().then(
      data => {
        this.defaultAccount = data[0];
      }
    );
  }

  //Auth contract methods
  public async signupUser(idCardNumber: string, healthCardId: string, passwordHash: string) {
    try {
      await this.authContract.methods.signupUser(idCardNumber, healthCardId, passwordHash).send({from: this.defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async loginUser(idCardNumber: string, healthCardId: string, passwordHash: string) {
    try {
      await this.authContract.methods.loginUser(idCardNumber, healthCardId, passwordHash).send({from: this.defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async updateUserPassword(oldPasswordHash: string, newPasswordHash: string) {
    try {
      await this.authContract.methods.updateUserPassword(oldPasswordHash, newPasswordHash).send({from: this.defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async updateUserRole(userId: string, userRole: string) {
    try {
      await this.authContract.methods.updateUserRole(userId, userRole).send({from: this.defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }

  public async readUserRole() {
    return await this.authContract.methods.readUserRole(this.defaultAccount).call();
  }

  //Healthcare contract methods
  public async createPatient() {
    try {
      await this.healthcareContract.methods.createPatient().send({from: this.defaultAccount, gasPrice: "0"});
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
      await this.healthcareContract.methods.updatePatient(patientId, name, dateOfBirth, email, phone, homeAddress, city, postalCode).send({from: this.defaultAccount, gasPrice: "0"});  
    }
    catch(err) {
      console.log(err);
    }
  }

  public async createDoctor() {
    try {
      await this.healthcareContract.methods.createDoctor().send({from: this.defaultAccount, gasPrice: "0"});
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
      await this.healthcareContract.methods.updateDoctor(doctorId, name, email, phone, homeAddress, city, postalCode, medicalSpeciality, assignedHospital).send({from: this.defaultAccount, gasPrice: "0"});
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
                                    treatmentsIds: number[]) {
      try {
        await this.healthcareContract.methods.updateMedicalRecord(medicalRecordId, medications, allergies, illnesses, immunizations, bloodType, hasInsurance, treatmentsIds).send({from: this.defaultAccount, gasPrice: "0"});  
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
      await this.healthcareContract.methods.createTreatment(patientId, doctorId, diagnosis, medicine, fromDate, toDate, bill).send({from: this.defaultAccount, gasPrice: "0"});
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
      await this.healthcareContract.methods.updateTreatment(treatmentId, patientId, doctorId, diagnosis, medicine, fromDate, toDate, bill).send({from: this.defaultAccount, gasPrice: "0"});
    }
    catch(err) {
      console.log(err);
    }
  }
}
