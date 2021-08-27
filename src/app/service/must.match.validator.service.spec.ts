import { TestBed } from '@angular/core/testing';

import { Must.Match.ValidatorService } from './must.match.validator.service';

describe('Must.Match.ValidatorService', () => {
  let service: Must.Match.ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Must.Match.ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
