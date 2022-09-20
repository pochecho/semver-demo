import { Injectable } from '@angular/core';
import { Account } from 'msal';
import jwt_decode from 'jwt-decode';

@Injectable()
export class TokenService {
  idToken: string;
  account: Account;
  tokenData: any;

  public setIdToken(value) {
    if (value) {
      this.idToken = value;
    } else {
      this.idToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsb2NhbC1nYWxhdGVhQGJhbmNvbG9tYmlhLmNvbS5jbyIsIm5hbWUiOiJsb2NhbC1nYWxhdGVhIn0.njHo81Z3xWwEPn3YX_NXD_b4iKvP7CHRSEdidzVMo-k';
    }
    this.tokenData = jwt_decode(this.idToken);
  }
  getTokenData(): any {
    const data = this.getTokenFromStorage();
    const token = jwt_decode(data);
    return token;
  }

  getTokenFromStorage(): any {
    const dataLocalStorage = localStorage.getItem('msal.idtoken');
    const dataSesionStorage = sessionStorage.getItem('msal.idtoken');
    this.setIdToken(dataLocalStorage || dataSesionStorage);
    return dataLocalStorage || dataSesionStorage;
  }
}
