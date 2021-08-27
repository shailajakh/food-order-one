import { Injectable } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = "default token"

  constructor() { }

  

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  setToken(token:string){
    if(!token){
      return console.log("notable to read token");
    }
    this.removeToken();
    window.localStorage.setItem(this.TOKEN_KEY,token);
  }


  getToken(){
   return window.localStorage.getItem(this.TOKEN_KEY);
  }


  removeToken(){
    window.localStorage.removeItem(this.TOKEN_KEY);
  }


}
