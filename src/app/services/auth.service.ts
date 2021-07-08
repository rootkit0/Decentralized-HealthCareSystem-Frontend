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
          if(jwt.verify(token, 'secret')) {
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
