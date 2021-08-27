import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageLocalService {

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
}
