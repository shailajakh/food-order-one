import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { TokenStorageService } from '../service/token-storage.service';


@Component({
  selector: 'app-delivery-charges',
  templateUrl: './delivery-charges.component.html',
  styleUrls: ['./delivery-charges.component.scss']
})
export class DeliveryChargesComponent implements OnInit {
  addressForm = new FormGroup({
    DeliveryLocation :new FormControl(''),
    Street :new FormControl(''),
    Suburb :new FormControl(''),
    City :new FormControl(''),
    Pincode :new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(6)]),
    
    });
  geocoder: google.maps.Geocoder;

  constructor(private apiserviceService: ApiserviceService,private localStorage : TokenStorageService) { }

  ngOnInit(): void {
    //this.findLocation("bangalore");
    //this.sendLanLat(13,72);
  }
  latitude = null;
  longitude = null;
Send(user:any){
  console.log("address sent",user)
    var body={
      'DeliveryLocation':user.DeliveryLocation,
      'Street':user.Street,
      'Suburb':user.Suburb,
      'City':user.City,
      'Pincode':user.Pincode
    };
    let full_address:string = user.DeliveryLocation+" "+user.Street+" "+user.Suburb+" "+user.City+" "+user.Pincode;

    this.findLocation(full_address);
    ;
  }

  lat: number;
  lng: number;
findLocation(address:any) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        

        if (results[0].geometry.location) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log("longitude,latitude",this.lat,this.lng)
          this.sendLanLat(this.lat,this.lng);
        }
        
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  distance:any;
  minOrder:any;
  delCharges:any
  sendLanLat(lat:any,lan:any){
    this.apiserviceService.OutletDeliveryChargesByUserGet(lat,lan).subscribe(
      (response) => {
        console.log("sendLanLat receive responce",response);

        if (response.Result) {
            console.log("sendLanLat success!",response.Result); 
            this.distance=response.Result.Distance;
            this.minOrder=response.Result.MinimumOrder;
            this.delCharges=response.Result.DeliveryCharge;

        } else {
            return false;
        }
      },
      error => console.log("User sendLanLat failed!",error));
  }





}
