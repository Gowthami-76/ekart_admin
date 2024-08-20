import { TestBed } from '@angular/core/testing';

import { EkartadminService } from './ekartadmin.service';

describe('EkartadminService', () => {
  let service: EkartadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkartadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
