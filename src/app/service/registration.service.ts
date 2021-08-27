import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient:HttpClient) { }

  RegisterUser (user:any)
  {
    return this.httpClient.post('https://tketz.in/api/wm/UserInsert',user);
  }
}
