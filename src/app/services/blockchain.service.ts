import { Injectable } from '@angular/core';
import Web3 from 'web3';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3!: Web3;

  //Declare contracts
  private userContract: any;
  private healthcareContract: any;
  //Declare contracts deploy addresses
  private userContractDeployedAt = "0xBa8dEddA1D497e44C5037aD573a47c77FbA9bB6B";
  private healthcareContractDeployedAt = "0x9aBDa1524Ac040DB1a5B17CDE86183009545F58c";
  
  constructor() {
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
      //Connect to local blockchain network
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      try {
        this.deployContracts();
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  public deployContracts() {
    this.userContract = new this.web3.eth.Contract(
      [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"a","type":"string"},{"internalType":"string","name":"b","type":"string"}],"name":"compareStrings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getUserRole","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"}],"name":"loginUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"passwordHash","type":"string"}],"name":"signupUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"idCardNumber","type":"string"},{"internalType":"string","name":"healthCardId","type":"string"},{"internalType":"string","name":"oldPasswordHash","type":"string"},{"internalType":"string","name":"newPasswordHash","type":"string"}],"name":"updateUserPassword","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userId","type":"address"},{"internalType":"string","name":"userRole","type":"string"}],"name":"updateUserRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
      this.userContractDeployedAt
    );
    this.healthcareContract = new this.web3.eth.Contract(
      [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"a","type":"string"},{"internalType":"string","name":"b","type":"string"}],"name":"compareStrings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"}],"name":"createDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createMedicalRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"gender","type":"string"}],"name":"createPatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"name":"createTreatment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"doctorList","outputs":[{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"downgradeDoctorToPatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"medicalRecordList","outputs":[{"internalType":"address","name":"medicalRecordId","type":"address"},{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"patientList","outputs":[{"internalType":"address","name":"patientId","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"address","name":"assignedDoctor","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"doctorAddress","type":"address"}],"name":"readDoctor","outputs":[{"components":[{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"},{"internalType":"address[]","name":"assignedPatients","type":"address[]"}],"internalType":"structHealthcare.Doctor","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"medicalRecordId","type":"address"}],"name":"readMedicalRecord","outputs":[{"components":[{"internalType":"address","name":"medicalRecordId","type":"address"},{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"},{"internalType":"uint256[]","name":"treatmentsIds","type":"uint256[]"}],"internalType":"structHealthcare.MedicalRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"patientAddress","type":"address"}],"name":"readPatient","outputs":[{"components":[{"internalType":"address","name":"patientId","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"address","name":"assignedDoctor","type":"address"}],"internalType":"structHealthcare.Patient","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_treatmentId","type":"uint256"}],"name":"readTreatment","outputs":[{"components":[{"internalType":"uint256","name":"treatmentId","type":"uint256"},{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"internalType":"structHealthcare.Treatment","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"treatmentList","outputs":[{"internalType":"uint256","name":"treatmentId","type":"uint256"},{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"doctorAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"assignedHospital","type":"string"},{"internalType":"string","name":"medicalSpeciality","type":"string"}],"name":"updateDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"medicalRecordId","type":"address"},{"internalType":"string","name":"medications","type":"string"},{"internalType":"string","name":"allergies","type":"string"},{"internalType":"string","name":"illnesses","type":"string"},{"internalType":"string","name":"immunizations","type":"string"},{"internalType":"string","name":"bloodType","type":"string"},{"internalType":"bool","name":"hasInsurance","type":"bool"},{"internalType":"uint256[]","name":"treatmentsIds","type":"uint256[]"}],"name":"updateMedicalRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"patientAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dateOfBirth","type":"uint256"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"homeAddress","type":"string"},{"internalType":"string","name":"gender","type":"string"}],"name":"updatePatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_treatmentId","type":"uint256"},{"internalType":"address","name":"patientId","type":"address"},{"internalType":"address","name":"doctorId","type":"address"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"medicine","type":"string"},{"internalType":"uint256","name":"fromDate","type":"uint256"},{"internalType":"uint256","name":"toDate","type":"uint256"},{"internalType":"uint256","name":"bill","type":"uint256"}],"name":"updateTreatment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradePatientToDoctor","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      this.healthcareContractDeployedAt
    );
  }

  public async getDefaultAccount() {
    var accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }

  //User contract methods
  public async signupUser(idCardNumber: string, healthCardId: string, passwordHash: string) {
    return await this.userContract.methods.signupUser(idCardNumber, healthCardId, passwordHash).call();
  }

  public async loginUser(idCardNumber: string, healthCardId: string, passwordHash: string) {
    return await this.userContract.methods.loginUser(idCardNumber, healthCardId, passwordHash).call();
  }

  public async updateUserPassword(idCardNumber: string, healthCardId: string, oldPasswordHash: string, newPasswordHash: string) {
    return await this.userContract.methods.updateUserPassword(idCardNumber, healthCardId, oldPasswordHash, newPasswordHash).call();
  }

  public async getUserRole() {
    return await this.userContract.methods.getUserRole();
  }

  public async updateUserRole(userId: any, userRole: string) {
    return await this.userContract.methods.updateUserRole(userId, userRole);
  }

  //Healthcare contract methods
  public async createPatient(name: string, dateOfBirth: number, email: string, phone: string, homeAddress: string, gender: string) {
    return await this.healthcareContract.methods.createPatient(name, dateOfBirth, email, phone, homeAddress, gender);
  }

  public async readPatient(patientAddress: any) {
    return await this.healthcareContract.methods.readPatient(patientAddress);
  }

  public async updatePatient(patientAddress:any, name: string, dateOfBirth: number, email: string, phone: string, homeAddress: string, gender: string) {
    return await this.healthcareContract.methods.updatePatient(patientAddress, name, dateOfBirth, email, phone, homeAddress, gender);
  }
}
