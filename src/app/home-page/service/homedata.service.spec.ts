import { TestBed } from '@angular/core/testing';

import { HomedataService } from './homedata.service';

describe('HomedataService', () => {
  let service: HomedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
