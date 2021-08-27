import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-offer-promotion',
  templateUrl: './offer-promotion.component.html',
  styleUrls: ['./offer-promotion.component.scss']
})
export class OfferPromotionComponent implements OnInit {

  constructor(private apiserviceService: ApiserviceService,private localStorage : TokenStorageService) { }

  ngOnInit(): void {
    this.PromotionGet_numStar(2);
  }

  tab='one';
  onlineOrder=false;
  tableBooking=false;
  dineIn=false;
  details=[];
  promotionItems =[];
  typeFood=false;
  PromotionGet_numStar(num:number):any{
    this.apiserviceService.PromotionGet(num).subscribe(
      (response) => {
        console.log("PromotionGet_numStar receive responce",response);

        if (response.Result) {
            console.log("PromotionGet_numStar success!",response.Result); 
            this.promotionItems = response.Result;
            this.promotionItems.forEach((val,ind)=>{
              this.details.push(val.Details);
            })
            // this.details= this.promotionItems[num].Details;
            console.log("detail",this.details);
            
            return this.promotionItems;
        } else {
            return false;
        }
      },
      error => console.log("User getEachItem failed!",error));
  }

  PromotionGet_numStar_sel(snum:string){
    if(snum==="one"){
      this.tab='one';
      console.log("one");
      this.PromotionGet_numStar(1);
    }
    else if(snum==="two"){
      this.tab='two';
      console.log("two");
      this.PromotionGet_numStar(2);
    }
    else if(snum==="three"){
      this.tab='three';
      console.log("three");
      this.PromotionGet_numStar(3);
    }
    else if(snum==="four"){
      this.tab='four';
      console.log("four");
      this.PromotionGet_numStar(4);
    }
    else if(snum==="five"){
      this.tab='five';
      console.log("five");
      this.PromotionGet_numStar(5);
    }

  }

}
