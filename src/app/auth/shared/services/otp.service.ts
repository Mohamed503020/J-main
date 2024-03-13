import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  url = environment.apiUrl + "/account";

  constructor(private _HttpClient: HttpClient) { }
}
