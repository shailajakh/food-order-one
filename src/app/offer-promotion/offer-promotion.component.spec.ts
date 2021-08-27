import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPromotionComponent } from './offer-promotion.component';

describe('OfferPromotionComponent', () => {
  let component: OfferPromotionComponent;
  let fixture: ComponentFixture<OfferPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
