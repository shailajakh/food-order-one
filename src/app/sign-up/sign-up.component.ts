import { value } from './../foodorder.model';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { MustMatch } from '../service/must.match.validator.service';
import { RegistrationService } from '../service/registration.service';
import { TokenStorageService } from '../service/token-storage.service';
import { RouterLink } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
export interface Registration
{
    FirstName:string;
    LastName:string;
    Gender:string;
    Age:string;
    DOB:string;
    Password:string;
    Mobile:string;
    OTP:string;
    Email:string;
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
}) 



export class SignUpComponent implements OnInit {
  closeResult: string;
  loginForm:FormGroup;
  registrationInputs: Registration[];
  currentUser: Registration[];
  isLoggedIn:boolean=false;

  cartItemCount:number=0;
  approvalText:string="";
  modalForm = new FormGroup({
  
    email: new FormControl(),
    password: new FormControl()
  })
   

  @Input()
  public alerts: Array<IAlert> = [];

  message = "";
  public globalResponse: any;
  registrationForm: FormGroup;

     

    constructor(private apiserviceService: ApiserviceService,private _http : HttpClient ,private tokenStorage : TokenStorageService ,private fb: FormBuilder) { }
       


    ngOnInit() {
     // this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
       this.registrationForm = this.fb.group({
        FirstName: ['',Validators.required],
        LastName:['',Validators.required],
        Gender:['SelectGender',Validators.required],
        Age:['',Validators.required],
        DOB:['',Validators.required],
        Password:['',Validators.required],
        Mobile:['',Validators.required],
        OTP:['',Validators.required],
        Email:['',Validators.compose([Validators.required,Validators.email])]
         
     
       });
      

    }
showOtpfeild = false;
    requestOTP(email){
      this.apiserviceService.GenerateOtp(email).subscribe((response)=>{
        console.log(response);
        if(response.Result=="1"){

          this.showOtpfeild = true;
        }

      })
    }

    // convenience getter for easy access to form fields
    RegisterUser (user:any)
    {
      this.apiserviceService.Userinsert(user) ;
  } 
  open(content) {
    this.alerts=[];
    //this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
  //    this.closeResult = `Closed with: ${result}`;
  //  }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   // });
  }
  // @ViewChild("passwordfeild",{static:false}) passwordValue:ElementRef;
  signupModal=false;
  showModal=false;
  openModal(){
    this.showModal=true;
  }

  opensignupModal(){
    this.signupModal=true;
  }



  submitClick(){
    console.log(this.modalForm.value);
    this.apiserviceService.Validateuser1(this.modalForm.value.email,this.modalForm.value.password).subscribe((success)=>{
      console.log(success)
    if(success.Result){
      console.log();
      ("Thank you "+success.Result.FirstName+". "+"you have succesfully logged in");
    }
    })
    this.showModal=false; 
  }

  private getDismissReason(reason: any): string {
    return "";
  }
  Login()
  {
    let user=this.loginForm.value;
    this.isLoggedIn=false;
    this.tokenStorage.removeToken();
    this.alerts=[];
    //console.log(user);
        this.registration(user)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Either user name or password is incorrect.'
              });
            },
            () => {
                this.tokenStorage.setToken(this.globalResponse.access_token);  
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Login successful. Now you can close and proceed further.',
                });
                this.isLoggedIn=true;
                
                }
              )
            }

  OnRegister()
  {
    this.registrationInputs=this.registrationForm.value;

    console.log(this.registrationInputs);
        this.RegisterUser(this.registrationInputs)
           ,
            error => { //This is error part
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Registration failed with fallowing error:'+error,
              });
            },
            () => {
                //  This is Success part
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Registration successful.',
                });
                
                }
            }
     public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  } 
  
  LogOut()
  {
    this.isLoggedIn=false;
    this.tokenStorage.removeToken();
  }
  
  registration(reg:any)
  {  
    
    // var userData = "FirstName=" + user.FirstName + "&LastName=" + user.LastName + "&Gender=" + user.Gender + "&Age=" + user.Age + "&DOB=" + user.DOB + "&Password=" + user.Password + "&Mobile=" + user.Mobile + "&OTP=" + user.OTP + "&Email=" + user.Email;
    // console.log("ValidateUser",userData)
    var body={
      'FirstName': reg.FirstName,
     'LastName': reg.LastName ,
      'Gender': reg.Gender,
      'Age':reg.Age,
      'DOB':reg.DOB,
      'Password':reg.Password,
      'Mobile':reg.Mobile,
      'OTP':reg.OTP,
      'Email':reg.Email
     
    };
    console.log("reg",body);
   return  this.apiserviceService.Userinsert(body).subscribe((Response)=>
    console.warn(Response));
    
  }

}

