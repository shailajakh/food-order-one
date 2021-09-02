import { value } from './../foodorder.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { TokenStorageService } from '../service/token-storage.service';
import { StorageLocalService } from '../storage-local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  addformdone=false;
  loggedin=true;
  showaddress=false;
  tab='one';
  paymentform = new FormGroup({
    paymentOptions: new FormControl('', Validators.required)
  });

  modalForm = new FormGroup({
  
    email: new FormControl(),
    password: new FormControl()
  })

  addreForm = new FormGroup({
    GUID :new FormControl(''),
    Name : new FormControl(''),
    Mobile :new FormControl(''),
    Email:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
    AddressType :new FormControl(''),
    DeliveryLocation :new FormControl(''),
    Street :new FormControl(''),
    Suburb :new FormControl(''),
    City :new FormControl(''),
    Pincode :new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(6)]),
    
    });
    registrationForm: FormGroup;
  constructor(private apiserviceService: ApiserviceService,private localStorage : TokenStorageService,private fb: FormBuilder,private Lstoreage: StorageLocalService) { 
    
  }

  isFormSubmitted = false;
  RADIO_LIST = [
    { name: 'Cash On Delivary', value: 'cash', checked: false },
    { name: 'Card On Delivary', value: 'card', checked: false },
    { name: 'Online Payment', value: 'online', checked: false }
  ];

  user:any;
  guestform: FormGroup;
  ngOnInit(): any {
    
    

      this.guestform = this.fb.group({
         name: ['', Validators.required ],
         LastName: ['', Validators.required ],
         Phone:['', Validators.required ],
         Email:['']
      });
      this.cart_Display();
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
     this.user =this.Lstoreage.get_UserInfo();
     let getCheckedRadio = null
    this.RADIO_LIST.forEach(o => {
      if (o.checked)
        getCheckedRadio = o.value;
    });
  }
  address = [];
 
  useraddressGet(guid:any){
    this.apiserviceService.UserAddressGet(guid).subscribe(
      (response) => {

        if (response.Result) {
            this.address = response.Result;
            console.warn("Thank you! Your submission has been received!");
            return response.Result;
        } else {
            return false;
        }
      },
      error => console.log("User useraddressGet failed!",error));
  }

  userAddress(user:any){

    let guid= this.Lstoreage.getData("USER_GUID");
    var body={
      'GUID':guid,
      'Name':user.Name,
      'Mobile':user.Mobile,
      'Email':user.Email,
      'AddressType':user.AddressType,
      'DeliveryLocation':user.DeliveryLocation,
      'Street':user.Street,
      'Suburb':user.Suburb,
      'City':user.City,
      'Pincode':user.Pincode
      
    };
    this.apiserviceService.UserAddressInsert(body).subscribe(
      (response) => {
        console.log("UserAddressInsert receive responce",response);

        if (response.Result) {
            this.address = response.Result;
            return response.Result;
        } else {
            return false;
        }
      },
      error => console.log("UserAddressInsert failed!",error));

  }
  
  forLater=false;
  forLater_set(){
    this.forLater=true;
  }

  showModal=false;
  openModal(){
    console.log("openModal");
    this.showModal=true;
  }
user_guid:any;
welcome=false;
username:string;
USER_logedin=false;
userName:any;
userEmail:any;
submitClick(data){
    console.log(data);
    this.apiserviceService.Validateuser1(data.email,data.password).subscribe((success)=>{
      console.log(success)
    if(success.Result){
      this.loggedin=false;
      this.showaddress=true;
      this.welcome=true;
     // this.USER_logedin=true;
      this.user_guid=success.Result.GUID;
      this.userName= success.Result.FirstName;
      this.userEmail= success.Result.Email;
      this.Lstoreage.setData("USER_NAME",this.userName);
      this.Lstoreage.setData("USER_GUID",this.user_guid);
      this.Lstoreage.setData("USER_EMAIL",this.userEmail);
      console.log("guid",this.user_guid);
      this.useraddressGet(this.user_guid);
      this.username=success.Result.FirstName;
      console.log("Thank you "+success.Result.FirstName+". "+"you have succesfully logged in");
    }
    })
    this.showModal=false; 
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
    console.log(Response));
    
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

    show_ondel_feild:boolean=false;
    show_online_feild:boolean=false;

    submitForm() {
      this.isFormSubmitted = true;
      if (!this.paymentform.valid) {
        console.log('Please provide all the required values!')
        return false;
      } else {
        
        if(this.paymentform.value.paymentOptions=="cash"){
          
          this.show_ondel_feild=true;
          console.log(this.paymentform.value)
        }
        else if(this.paymentform.value.paymentOptions=="card"){
          
          this.show_ondel_feild =true;
          console.log(this.paymentform.value)
        }
        else if(this.paymentform.value.paymentOptions=="online"){
         
          this.show_ondel_feild=false;
          this.show_online_feild=true;
          console.log(this.paymentform.value)

        }
        
      }
    }

    onChangeDeliveryTakeAway($event){
   
      if($event.target.checked){
        console.log("take away",$event.target.checked);
      }
      else{
        
        console.log("delivery",$event.target.checked)
      }
    
    }

    For_later_disp_input=false;

    onChangedel_time($event){
   
      if($event.target.checked){
        this.For_later_disp_input=true;
        console.log("For Later",$event.target.checked);
      }
      else{
        this.For_later_disp_input=false;
        console.log("ASAP",$event.target.checked);
      }
    
    }
    For_later_Timeinput($event){
      console.log($event.target.value);


        const str = $event.target.value;
        const year = Number(str[4]);
        const month = Number(str[2]);
        const date = Number(str[3]);

        console.log("Date=>"+ month+":"+date+":"+year);
          

    }
    For_later_Dateinput($event){
      console.log($event.target.value);
    }

   

    guest_detail(){
      debugger;
      console.log(this.guestform.value);
      debugger;
    }
    subscription: Subscription;

    cart_Display(){
    this.subscription = this.Lstoreage.getcartMessage()
    .subscribe(message => {
      console.log("cart of cart page",message)
    })
    }


}
