import { TestBed } from '@angular/core/testing';

import { UnitMerseareService } from './unit-merseare.service';

describe('UnitMerseareService', () => {
  let service: UnitMerseareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitMerseareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
