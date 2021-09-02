import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Headers ,Http  } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageService } from './service/token-storage.service';
import { StorageLocalService } from './storage-local.service';



export interface Person{
  [x: string]: any;
  username: string;
    password :string;
    grant_type : string;
    type : string;
    client_id : string;
}


@Injectable({
  providedIn: 'root'
})


export class ApiserviceService {


  constructor(private _http : HttpClient ,private tokenStorage : TokenStorageService,private Lstoreage: StorageLocalService) {}

  private Token;

  readToken(): any {
    this._http.post<any>('https://tketz.in/token', 'username=tester1%40widget.com&password=5A1EEB8C-F1EC-4C88-B50A-144A039F8451&grant_type=password&type=widget&clientid=7892')
    .subscribe(
      (response) => {
        // login successful if there's a jwt token in the response
        this.tokenStorage.setToken(response.access_token);
        if (response.access_token) {
            console.log("User authentication success!",response.access_token);
            return response.access_token;
        } else {
            return false;
        }
      },
       error => console.log("User authentication failed!",error));

}

CategoryGet(token:any):any{

               return this._http.get<any>('https://tketz.in/api/wm/CategoryGet');
                 
              }


ItemGet(id):any{

                return this._http.get<any>('https://tketz.in/api/wm/ItemGet?categoryID='+id)
                
              }

ItemByIDGet():any{

                return this._http.get<any>('https://tketz.in/api/wm/ItemByIDGet?ID=10');
              }
ItemIDByGet(id: any):any{

    return this._http.get<any>('https://tketz.in/api/wm/ItemByIDGet?ID='+id);
}          
UserAddressGet(guid:any):any{

  return this._http.get<any>('https://tketz.in/api/wm/UserAddressGet?guid='+guid);
}
OutletOpeningHoursGet():any{

  return this._http.get<any>('https://tketz.in/api/wm/OutletOpeningHoursGet');
  
}
StripeAccountIDGet():any{

  return this._http.get<any>('https://tketz.in/api/wm/StripeAccountIDGet');
}



//post api


// 2nd post


Orderinsert(body:any):any{
  // var body={
  //   "GUID": "40FE2447-BA30-4910-BB6F-F60F2E26A1A9",
  //     "AddressID": "2",
  
  //     "DeliveryCharge": "2",
  //   "DeliveryPromotionID": "1",
  //   "DeliveryPromotionType": "deliverypromotion",
  //     "PreOrderAlarmValue": "0",
  //   "FullfillmentAlarmValue": "15",
  
  //   "Note": "Less spicy",
  //   "IsPreOrder": "0",
  //   "IsTakeAway": "0",
  //   "PreOrderTime": "0",
  
  //   "OrderDetails": [{
  //       "ItemID": "16",
  //       "GUID": "123",
  //       "Note": "hi",
  //       "Quantity": "2",
  //       "AddOns": [{
  //         "ID": "1",
  //         "Quantity": "1"
  //       }],
  //       "FoodTypes": [{
  //         "ID": "9"
  //       }],
  //       "CombineItems": [{
  //         "CombineItemID": "4",
  //         "Quantity": "1"
  //       }]
  //     },
  //     {
  //       "ItemID": "6",
  //       "GUID": "321",
  //       "Note": "hi",
  //       "Quantity": "2",
  //       "PromotionID": "1",
  //       "PromotionType": "promotionitem",
  //       "AddOns": [{
  //         "ID": "9",
  //         "Quantity": "1"
  //       }],
  //       "FoodTypes": [],
  //       "CombineItems": []
  //     }
  //   ],
  //   "OrderCombos": [{
  //       "ComboID": "3",
  //       "GUID": "456",
  //       "Note": "hi",
  //       "Price": "12",
  //       "PromotionID": "1",
  //       "PromotionType": "promotioncombo",
  //       "OrderComboItems": [{
  //           "ItemID": "8",
  //           "AddOns": [{
  //             "ID": "10"
  //           }, {
  //             "ID": "11"
  //           }],
  //           "FoodTypes": [{
  //             "ID": "8"
  //           }]
  //         },
  //         {
  //           "ItemID": "7",
  //           "AddOns": [{
  //             "ID": "12"
  //           }],
  //           "FoodTypes": [{
  //             "ID": "5"
  //           }]
  //         }
  //       ]
  //     }
  
  //   ]
  // };
  
  return this._http.post<any>('https://tketz.in/api/wm/OrderInsert',body)
}
   

// 3rdpost

Userinsert(body:any):any{
  // var body={
  //   'FirstName':'John',
  //  'LastName':'Smith' ,
  //   'Gender':'male',
  //   'Age':'25',
  //   'DOB':'1987-07-04',
  //   'Password':'123',
  //   'Mobile':'9847121454',
  //   'OTP':'8536',
  //   'Email':'paul%40wh.com'
    
  // };
  return this._http.post<any>('https://tketz.in/api/wm/UserInsert',body);
}

// 4th post

GenerateOtp(email):any{
  var body={
    'Email':email,
    'Mobile':'9567775511'
    
  };

  return this._http.post<any>('https://tketz.in/api/wm/GenerateOTP',body);
}

// 5th post

Validateuser1(email,password):any{

  var body={
    'Email':email,
    'Password':password
    
  };

  return this._http.post<any>('https://tketz.in/api/wm/ValidateUser',body);
}


// 6th post

UserAddressInsert(user:any):any{
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

  return this._http.post<any>('https://tketz.in/api/wm/UserAddressInsert',body);
}

// 7th post


UserAddressUpdate(user:any):any{
  let guid= this.Lstoreage.getData("USER_GUID");

  var body={
    'ID': user.ID,
    'GUID': guid,
    'Name': user.Name,
    'Mobile': user.Mobile,
    'Email':user.Email,
    'AddressType':user.AddressType,
    'DeliveryLocation':user.DeliveryLocation,
    'Street':user.Street,
    'Suburb':user.Suburb,
    'City':user.City,
    'Pincode':user.Pincode
    
  };

  return this._http.post<any>('https://tketz.in/api/wm/UserAddressUpdate',body);
}



// 8th post


GenerateBookingOTP(name,email,phone):any{
  var body={
    'Customer':name,
    'Email':email,
    'Mobile':phone
    
  };

  return this._http.post<any>('https://tketz.in/api/wm/GenerateBookingOTP',body);
}

// 9th post

TableBookingInsertStep1():any{

  var body={
    'GUID':'8444C9A7-C23B-4B65-B55E-8093D8BE63C5',
    'TablePromotionID':'1',
    'TablePromotionType':'tablepromotion',
    'Note':'Make%20it%20fast',
    'BookingTime':'14%3A10',
    'NoPersons':'5',
    'Customer':'Fajar',
    'Email':'fajarpm%40gmail.com',
    'Mobile':'9566',
    'OTP':'598686'
    
  };

  return this._http.post<any>('https://tketz.in/api/wm/GenerateBookingOTP',body)
}


// 10th post


TableBookingInsertStep2():any{
  var body={
  	"GUID": "8444C9A7-C23B-4B65-B55E-8093D8BE63C5",
    "OrderID": "107",
	"Note": "Less spicy",

	"PreOrderAlarmValue": "0",

	"OrderDetails": [{
			"ItemID": "16",
			"GUID": "123",
			"Note": "hi",
			"Quantity": "2",
			"AddOns": [{
				"ID": "1",
				"Quantity": "1"
			}],
			"FoodTypes": [{
				"ID": "9"
			}],
			"CombineItems": [{
				"CombineItemID": "4",
				"Quantity": "1"
			}]
		},
		{
			"ItemID": "6",
			"GUID": "321",
			"Note": "hi",
			"Quantity": "2",
			"PromotionID": "1",
			"PromotionType": "promotionitem",
			"AddOns": [{
				"ID": "9",
				"Quantity": "1"
			}],
			"FoodTypes": [],
			"CombineItems": []
		}
	],
	"OrderCombos": [{
			"ComboID": "3",
			"GUID": "456",
			"Note": "hi",
			"Price": "12",
			"PromotionID": "1",
			"PromotionType": "promotioncombo",
			"OrderComboItems": [{
					"ItemID": "8",
					"AddOns": [{
						"ID": "10"
					}, {
						"ID": "11"
					}],
					"FoodTypes": [{
						"ID": "8"
					}]
				},
				{
					"ItemID": "7",
					"AddOns": [{
						"ID": "12"
					}],
					"FoodTypes": [{
						"ID": "5"
					}]
				}
			]
		}

	]
    
  };

  return this._http.post<any>('https://tketz.in/api/wm/TableBookingInsertStep2',body);
}



PromotionGet(numStar):any{

  return this._http.get<any>('https://tketz.in/api/wm/PromotionGet?star='+numStar)
  
}






OutletDeliveryChargesByUserGet(lan,lat):any{

  return this._http.get<any>('https://tketz.in/api/wm/OutletDeliveryChargesByUserGet?latitude='+lat+'&longitude='+lan);

}





// readAddress(addresss:any):any{
//   return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
//   addresss + '&key=AIzaSyCubhGEqRx57XjwKYjRZmi-HwiswOlEfHU');
//     //result.data.results
//   }





}
