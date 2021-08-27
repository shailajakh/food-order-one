import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OfferPromotionComponent } from './offer-promotion/offer-promotion.component';
import { NotificationModelsComponent } from './notification-models/notification-models.component';
import { DeliveryChargesComponent } from './delivery-charges/delivery-charges.component';
import { CartPageTableBookingNewComponent } from './cart-page-table-booking-new/cart-page-table-booking-new.component';
import { PaypalCheckoutComponent } from './paypal-checkout/paypal-checkout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ApiserviceService } from './apiservice.service';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { StorageLocalService } from './storage-local.service';

@NgModule({
  declarations: [
    AppComponent,
    TableBookingComponent,
    HomePageComponent,
    CartPageComponent,
    SignUpComponent,
    OfferPromotionComponent,
    NotificationModelsComponent,
    DeliveryChargesComponent,
    CartPageTableBookingNewComponent,
    PaypalCheckoutComponent,
    CreditCardComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCubhGEqRx57XjwKYjRZmi-HwiswOlEfHU'}),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule
  ],
  providers: [ApiserviceService,StorageLocalService,
              { provide: HTTP_INTERCEPTORS,
                useClass : TokenInterceptorService,
                multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
