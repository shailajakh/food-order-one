import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { TokenStorageService } from '../service/token-storage.service';
import { HomedataService } from './service/homedata.service';
import { Subscription } from 'rxjs';
import { HomefoodtypeService } from './service/homeFoodType.service';
import { StorageLocalService } from '../storage-local.service';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('collapse') collapse;
  ManageOrderItemForm: FormGroup;
  ordersData = [];
  
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
  inputCurrentNumber_Opt: any=0;
  constructor(private apiserviceService: ApiserviceService, private localStorage: TokenStorageService, private _homedataService: HomedataService, private homefoodtypeService: HomefoodtypeService,private storage: StorageLocalService,private router: Router,private Lstoreage: StorageLocalService,private formBuilder: FormBuilder) {
      this.ManageOrderItemForm = this.formBuilder.group({
        orders: new FormArray([])
    });
    
  }

  
initilize(){
  this.inputCurrentNumber=(this.inputCurrentNumber==undefined||0||null)?1:1;
  this.inputCurrentNumberC_Opt=(this.inputCurrentNumberC_Opt==undefined||0||null)?1:1;
  this.inputCurrentNumber_C_req=(this.inputCurrentNumber_C_req==undefined||0||null)?1:1;
  this.inputCurrentNumberF_Opt=(this.inputCurrentNumberF_Opt==undefined||0||null)?1:1;
  this.inputCurrentNumber_f_req=(this.inputCurrentNumber_f_req==undefined||0||null)?1:1;
    this.inputCurrentNumber_Opt=(this.inputCurrentNumber_Opt==undefined||0||null)?1:1;
    this.inputCurrentNumber_T = (this.inputCurrentNumber_T==undefined||0||null)?1:1;
}
  

  navData = null;
  add_to_cart=false;
  ngOnInit(): any {
    this.initilize();
    this.apiserviceService.readToken();
    //this.openingHours();
    this.apiserviceService.CategoryGet(this.localStorage.getToken()).subscribe(
      (response) => {
        console.log("CategoryGet receive responce", response);

        if (response.Result) {
          //console.log("CategoryGet success!", response.Result);
          this.navData = response.Result;
          this.getEachItem(this.navData[0].ID);
        } else {
          return false;
        }
      },
      error => console.log("User CategoryGet failed!", error));
      //this.getReqSpinnerValues(this.addon_item.AddOns);
      this.add_to_cart=false;
      
      
  }



  foodItems = [];

  getEachItem(id): any {
    this.apiserviceService.ItemGet(id).subscribe(
      (response) => {
        //console.log("ItemGet receive responce", response);

        if (response.Result) {
          //console.log("getEachItem success!", response.Result);
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
  inputCurrentNumber_T:any=1;
  ADD_item(id: any,item) {
    this.close_model=true;
    this.varAddOns = false;
    this.varFoodTypes = false;
    this.varCombineItems = false;
    this.add_to_cart=false;
    this.inputCurrentNumber_T = (this.inputCurrentNumber_T==undefined||0||null)?1:1;
    this.initilize();
    this.closecollapse=false;
    this.mainpopUp(id);
    this.orderArray.push(item);
    //console.log(this.orderArray);

  }

  entered_ADD_no_Addtocart(item){

    //this.orderArray.splice(this.orderArray.indexOf(item.id), 1);
    //console.log(this.orderArray);
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
            this.ordersData=[];
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
  close_model=false;
  submitcart(){

  this.add_to_cart=true;
     // this.Calculate_Total();
      this.OrderDetails.push(this.orderArray);
      console.log("order-array",this.orderArray);
    //  console.log("OrderDetails-array",this.OrderDetails);
      this.Cal_Price_item(this.orderArray);


     // document.getElementById('ADD_cart').click();
  //  this.router.navigateByUrl('/home'); 
    //  var myModal = document.getElementById('#addOnModal');
    //  myModal.hide( );
    // var myModal = document.getElementById('ADD_cart') // relatedTarget
    // myModal.show(myModal)
    //this.close_model=false;
  
  }
  public close() {
    this.closebutton.nativeElement.click();
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
  totalAmount: number = 0;
  Teach_item:any=0;
  T_Amount:number=0;
  addon_req_En=true;
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
      }      
    })
   
    if (isChecked) {
       this.addon_req_En=false;
       if(this.AddOnMultiSelect==false){
        this.inputCurrentNumber=Number(1);
        this.itemAmtAdonReq=Number(item.Price);
        this.totalAmount=Number(this.totalAmount);
         console.log("id full",item.ID,item.Name,item.Price)
         this.sendAddonReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq,totalamount: this.totalAmount });
       }else{
        this.inputCurrentNumber=Number(1);
        this.itemAmtAdonReq=Number(item.Price);
        this.totalAmount=Number(this.totalAmount);
       }  
         
       //console.log("sendAddonReq",this.sendAddonReq); 
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.addons){
            val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq,totalamount: this.totalAmount });
          }else{
            val.addons = [];
            val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, 
            totalamount:this.totalAmount });
          }
        }
      })
      
      
    } 
    else
    {
      this.addon_req_En=true;
      this.sendAddonReq.splice(this.sendAddonReq.indexOf(item.ID), 1);
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.addons){
            
            val.addons.splice(val.addons.indexOf(item.ID), 1);
          }else{
            //val.addons = [];
            val.addons.splice(val.addons.indexOf(item.ID), 1);
          }
        }
      })
  
    }
  
  }
  
  getReqSpinnerValues(item: any) {
    
    this.inputCurrentNumber=(this.inputCurrentNumber==undefined||0||null)?1:1;
    console.log("befor",this.inputCurrentNumber);
    this.inputCurrentNumber = Number((document.getElementById(item.ID) as HTMLInputElement).value);
    console.log("befor",this.inputCurrentNumber);
    this.inputCurrentNumber = (this.inputCurrentNumber==undefined||0||null)?1:this.inputCurrentNumber;
    this.inputCurrentNumber=Number(this.inputCurrentNumber);
    
    let data = { number: this.inputCurrentNumber, id: item.ID ,price: item.Price,amount:(this.inputCurrentNumber*Number(item.Price))}
    this.itemAmtAdonReq = this.inputCurrentNumber*Number(item.Price);
    
    this._homedataService.getCurrentActivedNumber(data);
    if(data.id===item.ID){
      this.T_Amount =  (this.itemAmtAdonReq);
      this.sendAddonReq.splice(this.sendAddonReq.indexOf(item.ID), 1);
    //  this.T_Amount= this.T_Amount - this.itemAmtAdonReq;
     this.sendAddonReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, 
                    totalamount:this.T_Amount});   
   
    console.log("sendAddonReq==>if",this.sendAddonReq);
     }else{
      this.T_Amount =  (this.totalAmount) + (this.itemAmtAdonReq);
      this.sendAddonReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber, amount: this.itemAmtAdonReq, 
        totalamount:this.T_Amount}); 
        console.log("sendAddonReq==>else",this.sendAddonReq);
  
     }
  }
  
  sendAddonOpt: any[] = [];
  itemAmtAdonOpt: any;
  totalAmount_Opt:any;
  addon_opt_En=true;
  onChangeAddonOpt(item, isChecked: boolean,addonItem) {
   
    this.subscription = this._homedataService.getNumberMessage()
    .subscribe(message => {
      if (message) {
        this.newNumber = message.number;
        this.sendAddonOpt.find((value, key) => {
          if (value.id == message.id)
           {
            value.NumberOfitem = message.number;
            message.price=Number(message.price);
            value.amount = message.price * message.number;
          }
          this.itemAmtAdonOpt = value.amount;
        for (var i = 0; i < this.sendAddonOpt.length; i++) {
          this.totalAmount_Opt =+this.totalAmount_Opt + +this.sendAddonOpt[i].amount;
        }
        value.totalamount=this.totalAmount_Opt;
       })  
  
       this.sendAddonOpt.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
  
            val.sendAddonOpt.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, totalamount: this.totalAmount_Opt });
            val.sendAddonOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt,totalamount: this.totalAmount_Opt }); 
        }
        this.orderArray.forEach((val,ind)=>{
          if(val.ID==addonItem.ID){
            if(val.addons){
              val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt,totalamount: this.totalAmount_Opt });
            }else{
              val.addons = [];
              val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, 
              totalamount:this.totalAmount_Opt });
            }
          }
        })
  
      }) 
       //console.log("sendAddonOpt",this.sendAddonOpt);  
      }      
    })
   
    if (isChecked) {
      this.addon_opt_En =false;
      if(this.AddOnMultiSelect==false){
        this.inputCurrentNumber_Opt=Number(1);
        this.itemAmtAdonOpt=Number(item.Price);
        this.totalAmount_Opt=Number(this.totalAmount_Opt);
         console.log("id full",item.ID,item.Name,item.Price)
         this.sendAddonOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt,totalamount: this.totalAmount_Opt }); 
       }else{} 

        
       //console.log("sendAddonOpt",this.sendAddonOpt); 
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.addons){
            val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt,totalamount: this.totalAmount_Opt });
          }else{
            val.addons = [];
            val.addons.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, 
            totalamount:this.totalAmount_Opt });
          }
        }
      })
      
      
    } 
    else
    {
      this.addon_opt_En =true;
      this.sendAddonOpt.splice(this.sendAddonOpt.indexOf(item.ID), 1);
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.addons){
            
            val.addons.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, totalamount: this.totalAmount_Opt });
          }else{
            //val.addons = [];
            val.addons.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, totalamount: this.totalAmount_Opt });
          }
        }
      })
  
    }
  
  }
  getOptSpinnerValues(item: any) {
    
    this.inputCurrentNumber_Opt=(this.inputCurrentNumber_Opt==undefined||0||null)?1:1;

    this.inputCurrentNumber_Opt = ((document.getElementById(item.ID) as HTMLInputElement).value);
    this.inputCurrentNumber = (this.inputCurrentNumber==undefined||0||null)?1:this.inputCurrentNumber;
    this.inputCurrentNumber_Opt=Number(this.inputCurrentNumber_Opt);
    let data = { number: this.inputCurrentNumber_Opt, id: item.ID ,price: item.Price,amount:(this.inputCurrentNumber_Opt*Number(item.Price))}
    this.itemAmtAdonOpt = this.inputCurrentNumber_Opt*Number(item.Price);
    this.T_Amount =  (this.totalAmount_Opt) + (this.itemAmtAdonOpt);
    this._homedataService.getCurrentActivedNumber(data);
    if(data.id===item.ID){
      this.sendAddonOpt.splice(this.sendAddonReq.indexOf(item.ID), 1);
      //this.T_Amount= this.T_Amount - this.itemAmtAdonOpt;
     this.sendAddonOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, 
                    totalamount:this.T_Amount});   
   
    console.log("sendAddonOpt==>if",this.sendAddonOpt);
     }else{
      this.sendAddonOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_Opt, amount: this.itemAmtAdonOpt, 
        totalamount:this.T_Amount}); 
        console.log("sendAddonOpt==>else",this.sendAddonOpt);
  
     }
  }

  // FOOD TYPE
  sendFoodReq: any[] = [];
itemAmtFoodReq: any;
Food_req_En=true;
inputCurrentNumber_f_req:any=0;
onChangeFoodReq(item, isChecked: boolean,addonItem) {
 
  this.subscription = this._homedataService.getNumberMessage()
  .subscribe(message => {
    if (message) {
      this.newNumber = message.number;
      this.sendFoodReq.find((value, key) => {
        if (value.id == message.id)
         {
          value.NumberOfitem = message.number;
          message.price=Number(message.price);
          value.amount = message.price * message.number;
        }
        this.itemAmtFoodReq = value.amount;
      for (var i = 0; i < this.sendFoodReq.length; i++) {
        this.totalAmount =+this.totalAmount + +this.sendFoodReq[i].amount;
      }
      value.totalamount=this.totalAmount;
     })  

     this.sendFoodReq.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){

          val.sendFoodReq.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, totalamount: this.totalAmount });
          val.sendFoodReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq,totalamount: this.totalAmount }); 
      }
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.foodType){
            val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq,totalamount: this.totalAmount });
          }else{
            val.foodType = [];
            val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, 
            totalamount:this.totalAmount });
          }
        }
      })

    }) 
     //console.log("sendFoodReq",this.sendFoodReq);  
    }      
  })
 
  if (isChecked) {
     this.Food_req_En=false;
     if(this.FoodTypeMultiSelect==false){
      this.inputCurrentNumber_f_req=Number(1);
      this.itemAmtFoodReq=Number(item.Price);
      this.totalAmount_Opt=Number(this.totalAmount_Opt);
       console.log("id full",item.ID,item.Name,item.Price)
       this.sendFoodReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq,totalamount: this.totalAmount_Opt }); 
     }else{}  
     
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.foodType){
          val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq,totalamount: this.totalAmount });
        }else{
          val.foodType = [];
          val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, 
          totalamount:this.totalAmount });
        }
      }
    })
    
    
  } 
  else
  {
    this.Food_req_En=true;
    this.sendFoodReq.splice(this.sendFoodReq.indexOf(item.ID), 1);
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.foodType){
          
          val.foodType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, totalamount: this.totalAmount });
        }else{
         // val.foodType = [];
          val.foodType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, totalamount: this.totalAmount });
        }
      }
    })

  }

}
FgetReqSpinnerValues(item: any) {
  
  this.inputCurrentNumber_f_req=(this.inputCurrentNumber_f_req==undefined||0||null)?1:1;
  
  this.inputCurrentNumber_f_req = ((document.getElementById(item.ID) as HTMLInputElement).value);
  this.inputCurrentNumber = (this.inputCurrentNumber==undefined||0||null)?1:this.inputCurrentNumber;
  this.inputCurrentNumber_f_req=Number(this.inputCurrentNumber_f_req);
  let data = { number: this.inputCurrentNumber_f_req, id: item.ID ,price: item.Price,amount:(this.inputCurrentNumber_f_req*Number(item.Price))}
  this.itemAmtFoodReq = this.inputCurrentNumber_f_req*Number(item.Price);
  
  this._homedataService.getCurrentActivedNumber(data);
  if(data.id===item.ID){
    this.T_Amount =  (this.itemAmtFoodReq);
    this.sendFoodReq.splice(this.sendFoodReq.indexOf(item.ID), 1);
  //  this.T_Amount= this.T_Amount - this.itemAmtFoodReq;
   this.sendFoodReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, 
                  totalamount:this.T_Amount});   
 
  console.log("sendFoodReq==>if",this.sendFoodReq);
   }else{
    this.T_Amount =  (this.totalAmount) + (this.itemAmtFoodReq);
    this.sendFoodReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_f_req, amount: this.itemAmtFoodReq, 
      totalamount:this.T_Amount}); 
      console.log("sendFoodReq==>else",this.sendFoodReq);

   }
}

sendFoodOpt: any[] = [];
inputCurrentNumberF_Opt:any=0;
food_opt_En=true;
itemAmtFoodOpt:any=0;
onChangeFoodOpt(item, isChecked: boolean,addonItem) {
 
  this.subscription = this._homedataService.getNumberMessage()
  .subscribe(message => {
    if (message) {
      this.newNumber = message.number;
      this.sendFoodOpt.find((value, key) => {
        if (value.id == message.id)
         {
          value.NumberOfitem = message.number;
          message.price=Number(message.price);
          value.amount = message.price * message.number;
        }
        this.itemAmtFoodOpt = value.amount;
      for (var i = 0; i < this.sendFoodOpt.length; i++) {
        this.totalAmount_Opt =+this.totalAmount_Opt + +this.sendFoodOpt[i].amount;
      }
      value.totalamount=this.totalAmount_Opt;
     })  

     this.sendFoodOpt.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){

          val.sendFoodOpt.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, totalamount: this.totalAmount_Opt });
          val.sendFoodOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt,totalamount: this.totalAmount_Opt }); 
      }
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.foodType){
            val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt,totalamount: this.totalAmount_Opt });
          }else{
            val.foodType = [];
            val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, 
            totalamount:this.totalAmount_Opt });
          }
        }
      })

    }) 
     //console.log("sendFoodOpt",this.sendFoodOpt);  
    }      
  })
 
  if (isChecked) {
    this.food_opt_En =false;
    if(this.FoodTypeMultiSelect==false){
      this.inputCurrentNumberF_Opt=Number(1);
      this.itemAmtFoodOpt=Number(item.Price);
      this.totalAmount_Opt=Number(this.totalAmount_Opt);
       console.log("id full",item.ID,item.Name,item.Price)
       this.foodtype.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount:this.itemAmtComboOpt ,totalamount: this.totalAmount_Opt }); 
     }else{}
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.foodType){
          val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt,totalamount: this.totalAmount_Opt });
        }else{
          val.foodType = [];
          val.foodType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, 
          totalamount:this.totalAmount_Opt });
        }
      }
    })
    
    
  } 
  else
  {
    this.food_opt_En =true;
    this.sendFoodOpt.splice(this.sendFoodOpt.indexOf(item.ID), 1);
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.foodType){
          
          val.foodType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, totalamount: this.totalAmount_Opt });
        }else{
        //  val.foodType = [];
          val.foodType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, totalamount: this.totalAmount_Opt });
        }
      }
    })

  }

}
FgetOptSpinnerValues(item: any) {
  
  this.inputCurrentNumberF_Opt=(this.inputCurrentNumberF_Opt==undefined||0||null)?1:1;
    
  this.inputCurrentNumberF_Opt = ((document.getElementById(item.ID) as HTMLInputElement).value);
  this.inputCurrentNumber = (this.inputCurrentNumber==undefined||0||null)?1:this.inputCurrentNumber;
  this.inputCurrentNumberF_Opt=Number(this.inputCurrentNumberF_Opt);
  let data = { number: this.inputCurrentNumberF_Opt, id: item.ID ,price: item.Price,amount:(this.inputCurrentNumberF_Opt*Number(item.Price))}
  this.itemAmtFoodOpt = this.inputCurrentNumberF_Opt*Number(item.Price);
  this.T_Amount =  (this.totalAmount_Opt) + (this.itemAmtFoodOpt);
  this._homedataService.getCurrentActivedNumber(data);
  if(data.id===item.ID){
    this.sendFoodOpt.splice(this.sendFoodReq.indexOf(item.ID), 1);
    //this.T_Amount= this.T_Amount - this.itemAmtFoodOpt;
   this.sendFoodOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, 
                  totalamount:this.T_Amount});   
 
  console.log("sendFoodOpt==>if",this.sendFoodOpt);
   }else{
    this.sendFoodOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberF_Opt, amount: this.itemAmtFoodOpt, 
      totalamount:this.T_Amount}); 
      console.log("sendFoodOpt==>else",this.sendFoodOpt);

   }
}
sendComboReq: any[] = [];
itemAmtComboReq: any;
Combo_req_En=true;
onChangeComboReq(item, isChecked: boolean,addonItem) {
 
  this.subscription = this._homedataService.getNumberMessage()
  .subscribe(message => {
    if (message) {
      this.newNumber = message.number;
      this.sendComboReq.find((value, key) => {
        if (value.id == message.id)
         {
          value.NumberOfitem = message.number;
          message.price=Number(message.price);
          value.amount = message.price * message.number;
        }
        this.itemAmtComboReq = value.amount;
      for (var i = 0; i < this.sendComboReq.length; i++) {
        this.totalAmount =+this.totalAmount + +this.sendComboReq[i].amount;
      }
      value.totalamount=this.totalAmount;
     })  

     this.sendComboReq.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){

          val.sendComboReq.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, totalamount: this.totalAmount });
          val.sendComboReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq,totalamount: this.totalAmount }); 
      }
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.CombType){
            val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq,totalamount: this.totalAmount });
          }else{
            val.CombType = [];
            val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, 
            totalamount:this.totalAmount });
          }
        }
      })

    }) 
     //console.log("sendComboReq",this.sendComboReq);  
    }      
  })
 
  if (isChecked) {
     this.Combo_req_En=false;
     if(this.FoodTypeMultiSelect==false){
      this.inputCurrentNumberC_Opt=Number(1);
      this.itemAmtComboOpt=Number(item.Price);
      this.totalAmount_Opt=Number(this.totalAmount_Opt);
       console.log("id full",item.ID,item.Name,item.Price)
       this.sendComboReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount:this.itemAmtComboOpt ,totalamount: this.totalAmount_Opt }); 
     }else{

     }
     
    console.log("extra req=>",this.sendComboReq)

    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.CombType){
          val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq,totalamount: this.totalAmount });
        }else{
          val.CombType = [];
          val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, 
          totalamount:this.totalAmount });
        }
      }
    })
    
    
  } 
  else
  {
    this.Combo_req_En=true;
    this.sendComboReq.splice(this.sendComboReq.indexOf(item.ID), 1);
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.CombType){
          
          val.CombType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, totalamount: this.totalAmount });
        }else{
      //    val.CombType = [];
          val.CombType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, totalamount: this.totalAmount });
        }
      }
    })

  }

}
inputCurrentNumber_C_req:any;
CgetReqSpinnerValues(item: any) {
  
  this.inputCurrentNumber_C_req=(this.inputCurrentNumber_C_req==undefined||0||null)?1:1;
 
  this.inputCurrentNumber_C_req = ((document.getElementById(item.ID) as HTMLInputElement).value);
  this.inputCurrentNumber = (this.inputCurrentNumber==undefined||0||null)?1:this.inputCurrentNumber;
  this.inputCurrentNumber_C_req=Number(this.inputCurrentNumber_C_req);
  let data = { number: this.inputCurrentNumber_C_req, id: item.ID ,price: item.Price,amount:(this.inputCurrentNumber_C_req*Number(item.Price))}
  this.itemAmtComboReq = this.inputCurrentNumber_C_req*Number(item.Price);
  
  this._homedataService.getCurrentActivedNumber(data);
  if(data.id===item.ID){
    this.T_Amount =  (this.itemAmtComboReq);
    this.sendComboReq.splice(this.sendComboReq.indexOf(item.ID), 1);
  //  this.T_Amount= this.T_Amount - this.itemAmtComboReq;
   this.sendComboReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, 
                  totalamount:this.T_Amount});   
 
  console.log("sendComboReq==>if",this.sendComboReq);
   }else{
    this.T_Amount =  (this.totalAmount) + (this.itemAmtComboReq);
    this.sendComboReq.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumber_C_req, amount: this.itemAmtComboReq, 
      totalamount:this.T_Amount}); 
      console.log("sendComboReq==>else",this.sendComboReq);

   }
}

sendComboOpt: any[] = [];
itemAmtComboOpt: any;
Comb_opt_En=true;
onChangeComboOpt(item, isChecked: boolean,addonItem) {
 
  this.subscription = this._homedataService.getNumberMessage()
  .subscribe(message => {
    if (message) {
      this.newNumber = message.number;
      this.sendComboOpt.find((value, key) => {
        if (value.id == message.id)
         {
          value.NumberOfitem = message.number;
          message.price=Number(message.price);
          value.amount = message.price * message.number;
        }
        this.itemAmtComboOpt = value.amount;
      for (var i = 0; i < this.sendComboOpt.length; i++) {
        this.totalAmount_Opt =+this.totalAmount_Opt + +this.sendComboOpt[i].amount;
      }
      value.totalamount=this.totalAmount_Opt;
     })  

     this.sendComboOpt.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){

          val.sendComboOpt.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, totalamount: this.totalAmount_Opt });
          val.sendComboOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt,totalamount: this.totalAmount_Opt }); 
      }
      this.orderArray.forEach((val,ind)=>{
        if(val.ID==addonItem.ID){
          if(val.CombType){
            val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt,totalamount: this.totalAmount_Opt });
          }else{
            val.CombType = [];
            val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, 
            totalamount:this.totalAmount_Opt });
          }
        }
      })

    }) 
    }      
  })
 
  if (isChecked) {
    this.Comb_opt_En =false;
    if(this.AddOnMultiSelect==false){
      this.inputCurrentNumberC_Opt=Number(1);
      this.itemAmtComboOpt=Number(item.Price);
      this.totalAmount_Opt=Number(this.totalAmount_Opt);
       console.log("id full",item.ID,item.Name,item.Price)
       this.sendComboOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, totalamount: this.totalAmount_Opt });
     }else{}  

    this.sendComboOpt.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){

          val.sendComboOpt.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, totalamount: this.totalAmount_Opt });
          val.sendComboOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt=item.Price,totalamount: this.totalAmount_Opt }); 
      }
      else{
        val.sendComboOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt=item.Price,totalamount: this.totalAmount_Opt }); 

      }
    });
    // update order
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.CombType){
          if(val.ID==item.Id){
            val.CombType.splice(val.CombType.indexOf(item.ID), 1);
            val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt,totalamount: this.totalAmount_Opt });
          }
          else
          {
            val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt,totalamount: this.totalAmount_Opt });
          }    
        }else{
          val.CombType = [];
          val.CombType.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, 
          totalamount:this.totalAmount_Opt });
        }
      }
    })
  } 
  else
  {
    this.Comb_opt_En =true;
    this.sendComboOpt.splice(this.sendComboOpt.indexOf(item.ID), 1);
    this.orderArray.forEach((val,ind)=>{
      if(val.ID==addonItem.ID){
        if(val.CombType){
          
          val.CombType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, totalamount: this.totalAmount_Opt });
        }else{
       //   val.CombType = [];
          val.CombType.splice({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, totalamount: this.totalAmount_Opt });
        }
      }
    })

  }

}
inputCurrentNumberC_Opt:any=0;
CgetOptSpinnerValues(item: any) {
  
  this.inputCurrentNumberC_Opt=(this.inputCurrentNumberC_Opt==undefined||0||null)?1:1;

  this.inputCurrentNumberC_Opt = ((document.getElementById(item.ID) as HTMLInputElement).value);
  this.inputCurrentNumber = (this.inputCurrentNumber==undefined||0||null)?0:this.inputCurrentNumber;
  this.inputCurrentNumberC_Opt=Number(this.inputCurrentNumberC_Opt);
  let data = { number: this.inputCurrentNumberC_Opt, id: item.ID ,price: item.Price,amount:(this.inputCurrentNumberC_Opt*Number(item.Price))}
  this.itemAmtComboOpt = this.inputCurrentNumberC_Opt*Number(item.Price);
  this.T_Amount =  (this.totalAmount_Opt) + (this.itemAmtComboOpt);
  this._homedataService.getCurrentActivedNumber(data);
  if(data.id===item.ID){
    this.sendComboOpt.splice(this.sendComboReq.indexOf(item.ID), 1);
    //this.T_Amount= this.T_Amount - this.itemAmtComboOpt;
   this.sendComboOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, 
                  totalamount:this.T_Amount});   
 
  console.log("sendComboOpt==>if",this.sendComboOpt);
   }else{
    this.sendComboOpt.push({ id: item.ID, name: item.Name, price: item.Price, NumberOfitem: this.inputCurrentNumberC_Opt, amount: this.itemAmtComboOpt, 
      totalamount:this.T_Amount}); 
      console.log("sendComboOpt==>else",this.sendComboOpt);

   }
}







  get ordersFormArray() {
    return this.ManageOrderItemForm.controls.orders as FormArray;
  }

  private addCheckboxes() {
    
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }




  sendDataToFoodTypeList: any[] = [];
  itemWiseAmoutForFoodType: any;
  totalAmountForFoodType: any;
  sum:any;



  RemoveButton(item: any) {
    //this.T_ARRAY.splice(this.T_ARRAY.indexOf(item.id), 1);
    this.orderArray.splice(this.orderArray.indexOf(item.id), 1);
    this.DispNew.splice(this.DispNew.indexOf(item.id), 1);
  }

  RemoveFoodTypeOrder(id) {
    this.sendDataToFoodTypeList.splice(this.sendDataToFoodTypeList.indexOf(id), 1);
  }

itemTotal:any=0;
basePrice:Number;
    addonPrice:Number;
    fdtypePrice:Number;
    totalPrice:Number;
    CombType:Number;
    baseName:any;
    baseID:any;
    baseTotal:Number;
    subTotal:Number;
    ctr:any=0;

    Cal_Price_item(array:any):any{
    
    this.basePrice=0;
    this.addonPrice=0;
    this.fdtypePrice=0;
    this.totalPrice=0;
    this.baseTotal=0;
    
    for (let i of array) 
    {
      this.baseID=i.ID;
      this.basePrice=i.Price;
      this.baseName=i.Name;
      this.itemTotal=0;
      if(i.addons){
        for(let j of i.addons)
        {
          this.addonPrice=Number(j.amount);
          this.itemTotal=this.itemTotal+Number(j.amount)
          
        }
        console.log("addon total:",this.itemTotal);
      }
      else{}
      if(i.foodType){
        for(let k of i.foodType)
        {

          this.fdtypePrice=Number(k.amount);
          this.basePrice=Number(k.amount);
          if(k.amount==0 )
          {
            this.itemTotal=this.itemTotal + Number(i.Price);
          }
          else{
            this.itemTotal=this.itemTotal+Number(k.amount);
          }
          
        }
        console.log("foodtype total:",this.itemTotal);
      }else{}
      
      if(i.CombType){
        for(let l of i.CombType)
        {
          this.CombType=Number(l.amount);
          this.itemTotal=this.itemTotal+Number(l.amount)
        }
        console.log("extra total:",this.itemTotal);
      }
      else{}
      console.log("itemTotal total:",this.itemTotal);
      this.baseTotal=this.itemTotal;
      if(this.itemTotal==0)
      {
        this.itemTotal = Number(i.Price);
      }
      let data={id:this.baseID,name:this.baseName,eachTotal:this.itemTotal};
      this.DispNew.push(data);
    }  
    
    console.log("display array:",this.DispNew)
    this.subTotal=0;
    this.ctr=0;
    for(let cartitem of this.DispNew){
      this.ctr++;
      this.subTotal= +this.subTotal + Number(cartitem.eachTotal)
    }

    return (this.itemTotal);
  }

  extraPrice=0;
//   Calculate_Total(){

//     // addons
//     // foodType
//     // CombType
//     let A_sum = 0;let F_sum = 0;let C_sum = 0;let T_sum=0;
//     this.itemTotal=0;

    
//     for(let i of this.orderArray)
//     {
//       this.basePrice=Number(i.Price);
//       console.log("basePrice",this.basePrice)
//       this.addonPrice=0;
//       if(i.addons){
//         for(let j of i.addons)
//         {
         
//             this.addonPrice=+this.addonPrice + +Number(j.amount);
         
//         }
//       }
//       else{}
//       if(i.foodType){
//         for(let j of i.foodType)
//         {
//           this.fdtypePrice=Number(j.price);
//           if(j.price!=="0"){
//           this.basePrice=Number(j.price);
//           }
         
//         }
//       }else{}
//       if(i.CombType){
//         for(let j of i.CombType)
//         {
//          // this.extraPrice=Number(j.price);
//           this.extraPrice=+this.extraPrice + +Number(j.amount);
         
//         }
//       }else{}
//     }    
//  this.totalPrice= +this.basePrice + +this.addonPrice + +this.extraPrice;
 
//  console.log("total of all base",this.basePrice);
//     console.log("total of all",this.totalPrice);
//    this.Lstoreage.setData("totalPrice",this.totalPrice)

//   }

  TOTAL_ALL:any=0;
  T_ARRAY:any[]=[];
  sum_all:any;
  quantity_model:any;
  DispNew:any=[];
  previd:any;
  getTotalSpinnerValues(item: any) {
    

    this.inputCurrentNumber_T = (this.inputCurrentNumber_T==undefined||0||null)?1:1;
    this.inputCurrentNumber_T = Number((document.getElementById(item.ID) as HTMLInputElement).value);  

  }


temp(item: any){
  
    
    this.closecollapse=true;
    if(this.customizForm.value=="same_c")
    {
    this.count=0;
      
    this.totalPrice=this.Lstoreage.getData("totalPrice");
    console.log("totalPrice",this.totalPrice);
    this.TOTAL_ALL= this.inputCurrentNumber_T * Number(this.totalPrice);
    let each_items ={id: item.ID,Name: item.Name,total:Number(this.TOTAL_ALL)}
    this.T_ARRAY.push(each_items);
    console.log("T_ARRAY",this.T_ARRAY);    
    this.sum_all=Number(0);
    this.Total=Number(0);
    for(let i of this.T_ARRAY)
    {
      this.count++;
      this.sum_all = +this.sum_all + +Number(i.total);
     }
     this.TOTAL=this.Total;
    
    console.log("this.T_ARRAY",this.T_ARRAY);
   
    console.log("this.sum_all",this.sum_all);
    this.closebutton.nativeElement.click();
  
  }
  else{
    this.inputCurrentNumber_T = (this.inputCurrentNumber_T==undefined||0||null)?1:1;
    
    let data = {id: item.ID ,number: this.inputCurrentNumber_T,price: item.Price,amount:Number(this.inputCurrentNumber_T)*Number(item.Price) }
    this.totalPrice =Number(this.inputCurrentNumber_T)*Number(item.Price);
    //this.totalPrice=this.Lstoreage.getData("totalPrice");
    this._homedataService.getCurrentActivedNumber(data);
   // console.log("totalPrice",this.totalPrice);
    this.TOTAL_ALL= this.inputCurrentNumber_T * Number(this.totalPrice);
    let each_items ={id: item.ID,Name: item.Name,total:Number(this.TOTAL_ALL)}
    this.T_ARRAY.push(each_items);
    console.log("T_ARRAY",this.T_ARRAY);
    this.sum_all=Number(0);
    this.Total=Number(0);
    for(let i of this.T_ARRAY)
    {
      this.count++;
      this.sum_all = +this.sum_all + +Number(i.total);
     }
     this.TOTAL=this.Total;
  

  
    console.log("this.T_ARRAY",this.T_ARRAY);
    console.log("this.sum_all",this.sum_all);

    this.Lstoreage.sendCartArry(this.T_ARRAY);

    

  }

    
  }


  customizForm = this.formBuilder.group({
    Customize: ['', [Validators.required]]
  })

  // Getter method to access form control
  get myForm() {
    return this.customizForm.get('Customize');
  }

  isSubmitted = false;
  closecollapse=false;
  customize()  {
    
    this.isSubmitted = true;
    if(this.customizForm.valid) {
      console.log(this.customizForm.value);
      return(this.customizForm.value)
    } else {
      console.log(this.myForm.errors?.required);
    }

    this.closecollapse=false;
  } 
  


//delivery take away


}

