import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomefoodtypeService {

  constructor() { }
  private subject = new Subject<any>();
  private ItemId = new Subject<any>();

  //public currentNumber: BehaviorSubject<any> = new BehaviorSubject([]);
  

  getCurrentActivedNumber(newNumber: any) {
    this.subject.next(newNumber);
  }

  setCurrentItemId(idToRemoveItem: any) {
    this.subject.next(idToRemoveItem);
  }

  getNumberMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  getIdForRemoveItemMessage(): Observable<any> {
    return this.ItemId.asObservable();
  }

}
