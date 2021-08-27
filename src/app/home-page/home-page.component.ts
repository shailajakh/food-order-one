import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { TokenStorageService } from '../service/token-storage.service';
import { HomedataService } from './service/homedata.service';
import { Subscription } from 'rxjs';
import { HomefoodtypeService } from './service/homeFoodType.service';
import { StorageLocalService } from '../storage-local.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  showMe: boolean = true;
  day: string = "";
  count: number = 0;
  newNumber: number[] = [];
  subscription: Subscription;
  
  inputCurrentNumber: any;
  inputOptinalCurrentNumber: any;


  public today = Date.now();
  totalarray: any;
  Array1: any;
  constructor(private apiserviceService: ApiserviceService, private localStorage: TokenStorageService, private _homedataService: HomedataService, private homefoodtypeService: HomefoodtypeService,private storage: StorageLocalService,private router: Router) {
  }

  navData = null;
  ngOnInit(): any {

    this.apiserviceService.readToken();
    //this.openingHours();
    // this.apiserviceService.readAddress("shivnager bidar");
    this.apiserviceService.CategoryGet(this.localStorage.getToken()).subscribe(
      (response) => {
        console.log("CategoryGet receive responce", response);

        if (response.Result) {
          console.log("CategoryGet success!", response.Result);
          this.navData = response.Result;
          this.getEachItem(this.navData[0].ID);
        } else {
          return false;
        }
      },
      error => console.log("User CategoryGet failed!", error));
      //this.getReqSpinnerValues(this.addon_item.AddOns);


      
  }



  foodItems = [];

  getEachItem(id): any {
    this.apiserviceService.ItemGet(id).subscribe(
      (response) => {
        console.log("ItemGet receive responce", response);

        if (response.Result) {
          console.log("getEachItem success!", response.Result);
          this.foodItems = response.Result;
          return this.foodItems;
        } else {
          return false;
        }
      },
      error => console.log("User getEachItem failed!", error));
  }


  orderinsert={};
  OrderDetails=[];
  AddOns=[];
  FoodTypes=[];
  CombineItems=[];

  orderinsert1: any = {

  };
  varAddOns = false;
  varFoodTypes = false;
  varCombineItems = false;
  orderArray=[];
  ADD_item(id: any,item) {
    this.varAddOns = false;
    this.varFoodTypes = false;
    this.varCombineItems = false;
    this.mainpopUp(id);
    this.orderArray.push(item);
    console.log(this.orderArray);
   
  }

  entered_ADD_no_Addtocart(item){

    this.orderArray.splice(this.orderArray.indexOf(item.id), 1);
    this.count--;
    console.log(this.orderArray);
  }

  
  addon_item: any = {};
  itemdisp = [];
  addon_1=[];
  foodtype=[];
  combineitem=[];
  a_required=false;
  f_required=false;
  c_required=false;
  AddOnMultiSelect=false;
  FoodTypeMultiSelect=false;
  CombineItemMultiSelect=false;


  mainpopUp(itemid: any) {
       
    
    this.apiserviceService.ItemIDByGet(itemid).subscribe(
      (response) => {
        console.log("addon receive responce", response);
      
        this.addon_item = response.Result;
        if ((this.addon_item.AddOns != "")) 
        { 
            this.varAddOns = true;
            console.log("addon==>",this.addon_item.AddOns)
            if(this.addon_item.IsAddOnMultiSelect=="1"){
            
            console.log("addon IsAddOnMultiSelect==>",this.addon_item.IsAddOnMultiSelect)
            this.AddOnMultiSelect=true;
            }

           for(let i=0;i<this.addon_item.AddOns.length;i++){
                if(this.addon_item.AddOns[i].IsRequireCustomerSelection==="1")
                {                                 
                  this.a_required=true;
                }
                else{
                  this.a_required=false;
                }            
           }

        }
        if (this.addon_item.FoodTypes != "") { 
          this.varFoodTypes = true;
          console.log("foodtype array=>",this.addon_item.FoodTypes)
          if(this.addon_item.IsFoodTypeMultiSelect=="1"){
            console.log("addon IsFoodTypeMultiSelect==>",this.addon_item.IsFoodTypeMultiSelect)
            this.FoodTypeMultiSelect=true;
            }
          for(let i=0;i<this.addon_item.FoodTypes.length;i++){
            if(this.addon_item.FoodTypes[i].IsRequireCustomerSelection==="1")
            {
                             
              this.f_required=true;

            }
            else{
              this.f_required=false;
            }
        
       }
          
         }
        if ((this.addon_item.CombineItems != "")) { 
          this.varCombineItems = true;
          if(this.addon_item.IsCombineItemMultiSelect=="1"){
            console.log("addon IsCombineItemMultiSelect==>",this.addon_item.IsCombineItemMultiSelect)
            this.CombineItemMultiSelect=true;
            }
          for(let i=0;i<this.addon_item.CombineItems.length;i++){
            if(this.addon_item.CombineItems[i].IsRequireCustomerSelection==="1")
            {
                             
              this.f_required=true;

            }
            else{
              this.f_required=false;
            }
        
            }
         }
      },
      error => console.log("addon failed!", error));
  }



  
  TOTAL:any=0;
  Total:any;
  totalArray=[];
  item_Total:number=0;
  submitcart(){
    this.count++;
     this.item_Total=0;
     this.item_Total = this.Tprice_item(this.orderArray);
     console.log("totalarray==>",this.totalArray);
     this.totalArray.push(this.item_Total);   
     this.display_total(this.totalArray);
     this.OrderDetails.push(this.orderArray);
     console.log("OrderDetails=>",this.OrderDetails);
     console.log(this.orderArray);

   
     //.router.navigateByUrl('/');
  
  }
  display_total(array){
    this.Total=0;
    for(let i=0;i < array.length;i++)
    {
      this.Total = +this.Total + +array[+i];
     console.log("this.TOTAL i==>",this.Total);
     }
     this.TOTAL=this.Total;
  }

  


  orderinset() {
    this.apiserviceService.Orderinsert(this.orderinsert).subscribe(
      (response) => {
        console.log("Orderinsert receive responce", response);

        if (response.Result == "1") {
          console.log("Orderinsert success!", response.Result);
        } else {
          return false;
        }
      },
      error => console.log("User Orderinsert failed!", error));
  }




  toogleTag() {
    this.showMe = !this.showMe
  }


  selected = [];
  

  NoteMenuInfo: any;;
  getTextAreaInput(val) {
    this.NoteMenuInfo = val;
  }

  sendAddonReq: any[] = [];
  itemAmtAdonReq: any;
  totalAmount: any=0;
  Teach_item:any=0;

  onChangeAddonReq(item, isChecked: boolean,addonItem) {
   
    this.subscription = this._homedataService.getNumberMessage()
    .subscribe(message => {
      if (message) {
        this.newNumber = message.number;
        this.sendAddonReq.find((value, key) => {
          if (value.id == message.id)
           {
            value.NumberOfitem = message.number;
            message.price=Number(message.price);
            value.amount = message.price * message.number;
          }
          this.itemAmtAdonReq = value.amount;
        for (var i = 0; i < this.sendAddonReq.length; i++) {
          this.totalAmount =+this.totalAmount + +this.sendAddonReq[i].amount;
        }
        value.totalamount=this.totalAmount;
       })  
       console.log("total num",this.inputCurrentNumber,this.itemAmtAdonReq,this.totalAmount);     
      }      
    })
   
    if (isChecked) {

     
      this.sendAddonReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq,totalamount: this.totalAmount });
            
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.addons){
            val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq,totalamount: this.totalAmount });
          }else{
            val.addons = [];
            val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber==(0||null||undefined||'')?1:this.inputCurrentNumber, amount: this.itemAmtAdonReq==(0||null||undefined||'')?item.Price:this.itemAmtAdonReq, 
            totalamount: this.totalAmount==(null||undefined||'')?item.Price:this.totalAmount });
          }
        }
      })
      
      
    } 
    else
    {
      this.sendAddonReq.splice(this.sendAddonReq.indexOf(item.ID), 1);
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.addons){
            
            val.addons.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
          }else{
            val.addons = [];
            val.addons.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
          }
        }
      })

    }
    
    // this.AmountCalculationForBacon();

  }

  sendAddonOpt: any[] = [];
  itemAmtAdonOpt: any;

  onChangeAddonOpt(item, isChecked: boolean,addonItem) {
   
    // this.subscription = this._homedataService.getNumberMessage()
    // .subscribe(message => {   
    //   if (message) {
    //     this.newNumber = message.number;
    //     this.sendAddonOpt.find((value, key) => {
         
    //       if (value.id == message.id) {
    //         value.NumberOfitem = message.number;
    //         value.amount = Number(value.price) * message.number;
    //       }
    //     for (var i = 0; i < this.sendAddonOpt.length; i++) {
    //       this.totalAmount =+this.totalAmount + +this.sendAddonOpt[i].amount;
    //     }
    //     value.totalamount=this.totalAmount;
          
    //     })        //this.AmountCalculationForBacon();
    //   }      
    // })
    // if (isChecked) {
    
    //   this.sendAddonOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
    //   console.log("sendAddonReq",this.sendAddonReq);
    //   this.orderArray.forEach((val,ind)=>{
    //     if(val.ID==addonItem.ID){
    //       if(val.addons){
    //         val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
    //       }else{
    //         val.addons = [];
    //         val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
    //       }
    //     }
    //   })
      
    // } 
    // else
    // {
    //   this.sendAddonOpt.splice(this.sendAddonOpt.indexOf(item.ID), 1);
    //   this.orderArray.forEach((val,ind)=>{
    //     if(val.ID==addonItem.ID){
    //       if(val.addons){
            
    //         val.addons.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
    //       }else{
    //         val.addons = [];
    //         val.addons.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, totalamount: this.totalAmount });
    //       }
    //     }
    //   })
    //   console.log("orderArray splice part",this.orderArray);
      
    // }
    // this.AmountCalculationForBacon();

    
    
  }

  sendDataToFoodTypeList: any[] = [];
  itemWiseAmoutForFoodType: any;
  totalAmountForFoodType: any;
  sum:any;
  private AmountCalculationForBacon() {
    this.sum=0;
    this.sum=Number(this.sum);
  
    for (var i = 0; i < this.sendAddonOpt.length; i++) {
      this.sum =+this.sum + +Number(this.sendAddonOpt[i].amount);
    }
    this.totalAmount = this.sum;
    
  }

  onChangeFoodType(item, isChecked: boolean,addonItem) {

    this.subscription = this.homefoodtypeService.getNumberMessage().subscribe(message => {    
      if (message) {
        this.newNumber = message.number;
        this.sendDataToFoodTypeList.find((value, key) => {
          if (value.id == message.id) {
            value.NumberOfitem = message.number;
            value.amount = message.price * message.number;
          }
        })
        this.AmountCalculation();
      }
    });


    if (isChecked) {
      this.sendDataToFoodTypeList.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: Number(this.inputOptinalCurrentNumber), amount: Number(this.itemWiseAmoutForFoodType) });
      console.log("sendDataToFoodTypeList====>",this.sendDataToFoodTypeList);
      
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.foodType){
            val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputOptinalCurrentNumber, amount: this.itemWiseAmoutForFoodType });
          }else{
            val.foodType = [];
            val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputOptinalCurrentNumber, amount: this.itemWiseAmoutForFoodType });
          }
        }
      })
      console.log("orderArray",this.orderArray);
      

    } else {
      this.sendDataToFoodTypeList.splice(this.sendDataToFoodTypeList.indexOf(item.ID), 1);
    }

    this.AmountCalculation();
  }


  private AmountCalculation() {
    let sum = 0;
    for (var i = 0; i < this.sendDataToFoodTypeList.length; i++) {
      sum += this.sendDataToFoodTypeList[i].amount;
      
      console.log(sum);
    }
    this.totalAmountForFoodType = sum;
  }

  getReqSpinnerValues(item: any) {
    this.inputCurrentNumber = ((document.getElementById(item.ID) as HTMLInputElement).value);
    this.inputCurrentNumber=Number(this.inputCurrentNumber);
    let data = { number: this.inputCurrentNumber, id: item.ID ,price: item.Price}
    console.log("baken values=>",data)
    
    this._homedataService.getCurrentActivedNumber(data);
  }


  getOptinalValues(item: any) {
    this.inputOptinalCurrentNumber = ((document.getElementById(item.ID) as HTMLInputElement).value);
    let data = { number: this.inputOptinalCurrentNumber, id: item.ID }
    this.inputOptinalCurrentNumber=Number(this.inputOptinalCurrentNumber);
    console.log("typof==>",typeof this.inputOptinalCurrentNumber)
    this.homefoodtypeService.getCurrentActivedNumber(data);
  }


  RemoveButton(item: any) {
    this.entered_ADD_no_Addtocart(item);
  }

  RemoveFoodTypeOrder(id) {
    this.sendDataToFoodTypeList.splice(this.sendDataToFoodTypeList.indexOf(id), 1);
  }

itemTotal:any=0;
basePrice:Number;
    addonPrice:Number;
    fdtypePrice:Number;
    totalPrice:Number;

  Tprice_item(array:any):any{
    
    this.basePrice=0;
    this.addonPrice=0;
    this.fdtypePrice=0;
    this.totalPrice=0;
    
    console.log("array",array)
    for (let i of array) 
    {
      this.basePrice=i.Price;
      console.log("base price",this.basePrice)
      this.itemTotal=0;
      if(i.addons){
        console.log("addons===>",i.addons);
        for(let j of i.addons)
        {
          console.log("i.addons===>",j.price);
          this.addonPrice=Number(j.price);
          this.itemTotal=this.itemTotal+Number(j.price)
          
        }
      }
      else{}
      if(i.foodType){
        console.log("foodType ===>",i.foodType);
        for(let j of i.foodType)
        {
          //basePrice=0;
          console.log("i.foodType===>",j.price);
          this.fdtypePrice=Number(j.price);
          this.basePrice=Number(j.price);

          this.itemTotal=this.itemTotal+Number(j.price);
       
        }
      }else{}
    }

    
 this.totalPrice= +this.basePrice + +this.addonPrice; 

    console.log("totalPrice===>each element",this.totalPrice);
    return (this.totalPrice);

  }






}

