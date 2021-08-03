import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { BlockchainService } from './blockchain.service';

//For obvious security reasons must store priv key in unaccessible site
const PRIV_KEY = "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";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public async generateToken(user: any) {
    const accessToken = jwt.sign({user}, PRIV_KEY, {
      expiresIn: 1000
    });
    this.setToken(accessToken);
  }

  private setToken(token: any): void {
    localStorage.setItem('auth_token', token);
  }

  private getToken() {
    return localStorage.getItem('auth_token');
  }

  public removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  private validateToken(): boolean {
    const token = this.getToken();
    if(token) {
        try {
          if(jwt.verify(token, PRIV_KEY)) {
            return true;
          }
        }
        catch(error) {
          console.log(error);
        }
    }
    return false;
  }

  public isAuthenticated(): boolean {
    return this.validateToken();
  }
}
