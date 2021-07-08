import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public async generateToken(user: any) {
    const accessToken = jwt.sign({user}, 'secret', {
      expiresIn: 300
    });
    return accessToken;
  }

  public setToken(token: any) {
    localStorage.setItem('auth_token', token);
  }

  public getToken() {
    return localStorage.getItem('auth_token');
  }

  public removeToken() {
    localStorage.removeItem('auth_token');
  }

  public validateToken(): boolean {
    const token = this.getToken();
    if(token) {
        if(jwt.verify(token, 'secret')) {
          return true;
        }
    }
    return false;
  }

  public isSignedIn() {
    this.validateToken();
  }
}
