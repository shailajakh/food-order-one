import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationModelsComponent } from './notification-models.component';

describe('NotificationModelsComponent', () => {
  let component: NotificationModelsComponent;
  let fixture: ComponentFixture<NotificationModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
