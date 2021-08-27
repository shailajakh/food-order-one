import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { CartPageTableBookingNewComponent } from './cart-page-table-booking-new/cart-page-table-booking-new.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { DeliveryChargesComponent } from './delivery-charges/delivery-charges.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotificationModelsComponent } from './notification-models/notification-models.component';
import { OfferPromotionComponent } from './offer-promotion/offer-promotion.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TableBookingComponent } from './table-booking/table-booking.component';


const routes: Routes = [

  { path :'', component : HomePageComponent },
  { path :'sign-up', component : SignUpComponent},
  
  { path :'table-booking', component : TableBookingComponent },
  { path : 'cart-page' , component : CartPageComponent },
  { path : 'offer-promotion' ,component : OfferPromotionComponent },
  { path : 'notification-Models' , component : NotificationModelsComponent },
  { path : 'delivary-charges' , component : DeliveryChargesComponent },
  { path : 'cart-page-table-booking-new' , component : CartPageTableBookingNewComponent },
  { path : 'CreditCard' , component : CreditCardComponent }

];



@NgModule({
  imports: [HttpClientModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
