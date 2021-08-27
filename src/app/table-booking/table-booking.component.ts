import { ApiserviceService, Person } from './../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.scss']
})
export class TableBookingComponent implements OnInit {
  tableBookingForm: FormGroup;
  constructor(private apiserviceService: ApiserviceService,private _http : HttpClient ,private tokenStorage : TokenStorageService ,private fb: FormBuilder) { }
  tab='one';
  tBookingForm = new FormGroup({
  
    Person: new FormControl(),
    Date: new FormControl(),
    Time: new FormControl()
  });

  ngOnInit(): void { 
    this.tableBookingForm = this.fb.group({
      Name: ['',Validators.required],
      Email:['',Validators.compose([Validators.required,Validators.email])],
      Mobile:['',Validators.required],
      OTP:['',Validators.required]
     });
   }
   
   showOtpfeild_otp = false;
    requestOTP_TB(name,email,phone){
      this.apiserviceService.GenerateBookingOTP(name,email,phone).subscribe((response)=>{
        console.log(response);
        if(response.Result=="1"){

          this.showOtpfeild_otp = true;
        }

      })
    }
    T_booked=false;
    tableBooked(){
      this.T_booked=true;

    }
    person:any;
    date:any;
    time:any;

    tBooking(book:any)
    {
      console.log("tbooking",book)
      this.person=book.Person;
    this.date=book.Date;
    this.time=book.Time;
   
    }
  tableBooking(){

  }
 
 
  
}
