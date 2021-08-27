import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageTableBookingNewComponent } from './cart-page-table-booking-new.component';

describe('CartPageTableBookingNewComponent', () => {
  let component: CartPageTableBookingNewComponent;
  let fixture: ComponentFixture<CartPageTableBookingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPageTableBookingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageTableBookingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
