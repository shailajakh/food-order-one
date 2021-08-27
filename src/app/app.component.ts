import { ApiserviceService } from './apiservice.service';
import { Component } from '@angular/core';
import { TokenParams } from './classes/token-params.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './service/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tokenParams:TokenParams;
  day:string="";
  title = 'food-order';


 constructor(private apiserviceService: ApiserviceService,private localStorage : TokenStorageService){ }
 

 ngOnInit()
 {
  this.openingHours();
  
    //this.apiserviceService.readToken(); 
  //this.apiserviceService.CategoryGet(this.localStorage.getToken());
 //  this.apiserviceService.ItemGet();
// //   this.apiserviceService.ItemByIDGet();
//    this.apiserviceService.UserAddressGet();
//    this.apiserviceService.OutletOpeningHoursGet();
//    this.apiserviceService.StripeAccountIDGet();

  //  post

  // this.apiserviceService.Orderinsert();
  // this.apiserviceService.Userinsert();
  // this.apiserviceService.GenerateOtp();
  // this.apiserviceService.Validateuser();
  // this.apiserviceService.UserAddressInsert();
  // this.apiserviceService.UserAddressUpdate();
  // this.apiserviceService.GenerateBookingOTP();
  // this.apiserviceService.TableBookingInsertStep1();
  // this.apiserviceService.TableBookingInsertStep2();


 }
 hour =[];
 openingHours(){
  
   this.apiserviceService.OutletOpeningHoursGet().subscribe(
     (response) => {
       console.log("OutletOpeningHoursGet receive responce",response);

       if (response.Result) {
           this.hour=response.Result;

           switch (new Date().getDay()) {
             case 0:
               this.day = "Sunday";
               return this.hour;
             case 1:
               this.day = "Monday";
               return this.hour;
             case 2:
               this.day = "Tuesday";
               return this.hour;
             case 3:
               this.day = "Wednesday";
               return this.hour;
             case 4:
               this.day = "Thursday";
               return this.hour;
             case 5:
               this.day = "Friday";
               return this.hour;
             case 6:
               this.day = "Saturday";
               return this.hour;        
           }
           console.log("OutletOpeningHoursGet success!",response.Result);
       } else {
           return false;
       }
     },
     error => console.log("User OutletOpeningHoursGet failed!",error));
 }

 
}
