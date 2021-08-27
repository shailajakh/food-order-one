import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  creditCardForm: FormGroup;
  submitted: boolean = false;
  donationForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.creditCardForm = this._fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expirationDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]] 
    });
    
  }

  onSubmit(form) {
    this.submitted = true;
    console.log(form);
  }


}
