import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private _HttpClient: HttpClient) {
  }

  getGuestIpAddress() {
    return this._HttpClient.get(`https://api.ipify.org?format=json`);
  }
}
