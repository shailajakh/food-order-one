import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageLocalService {

   private subject = new Subject<any>();
   
  constructor() { }

  setData(key ,data) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
 }
 
 getData(key) {
    //return localStorage.getItem('myData')
    var data = JSON.parse(localStorage.getItem(key))
    return data;
 }
 
 removeData(key) {
    localStorage.removeItem(key)
 }

 clear(){
  localStorage.clear();

 }

 userName:any;
 user_guid:any;
 userEmail:any;
 get_UserInfo(){
    var USER ={
      'GUID': this.getData("USER_GUID"),
      'Name': this.userName=this.getData("USER_NAME"),
      //'Mobile': this.getData("USER_EMAIL"),
      'Email':this.getData("USER_EMAIL")
    }
    return USER;
 }


 sendCartArry(CartArry: any) {
   this.subject.next(CartArry);
 }
 setCurrentItemId(idToRemoveItem: any) {
   this.subject.next(idToRemoveItem);
   
 }

 getcartMessage(): Observable<any> {
   return this.subject.asObservable();
   
 }




}
