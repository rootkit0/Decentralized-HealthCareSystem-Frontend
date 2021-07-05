import { Injectable } from '@angular/core';
import Web3 from 'web3';
import userContractJson from '../smartcontracts/user.json';
import healthcareContractJson from '../smartcontracts/healthcare.json';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3!: Web3;

  //Declare contracts
  private userContract: any;
  private healthcareContract: any;
  //Declare contracts interfaces
  private userContractInterface = (<any>userContractJson).interface;
  private healthcareContractInterface = (<any>healthcareContractJson).interface;
  //Declare contracts deploy addresses
  private userContractDeployedAt = "0x00";
  private healthcareContractDeployedAt = "0x00";
  
  constructor() {
    this.connectBlockchain();
  }

  private async connectBlockchain() {
    //Modern dapp browsers
    if(typeof window.ethereum !== "undefined") {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        this.userContract = new this.web3.eth.Contract(
          JSON.parse(this.userContractInterface),
          this.userContractDeployedAt
        );
        this.healthcareContract = new this.web3.eth.Contract(
          JSON.parse(this.healthcareContractInterface),
          this.healthcareContractDeployedAt
        );
      }
      catch(error) {
          console.log(error);
      }
    }
    //Legacy dapp browsers
    else if(typeof window.web3 !== "undefined") {
      this.web3 = new Web3(window.web3.currentProvider);
      try {
        this.userContract = new this.web3.eth.Contract(
          JSON.parse(this.userContractInterface),
          this.userContractDeployedAt
        );
        this.healthcareContract = new this.web3.eth.Contract(
          JSON.parse(this.healthcareContractInterface),
          this.healthcareContractDeployedAt
        );
      }
      catch(error) {
        console.log(error);
      }
    }
    //External blockchain provider
    else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8500"));
      try {
        this.userContract = new this.web3.eth.Contract(
          JSON.parse(this.userContractInterface),
          this.userContractDeployedAt
        );
        this.healthcareContract = new this.web3.eth.Contract(
          JSON.parse(this.healthcareContractInterface),
          this.healthcareContractDeployedAt
        );
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  public async getDefaultAccounts() {
    return await this.web3.eth.getAccounts();
  }

  public async loginUser() {
    return await this.userContract.methods.login().call();
  }

}
