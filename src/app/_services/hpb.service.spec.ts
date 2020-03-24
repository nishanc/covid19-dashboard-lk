/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HpbService } from './hpb.service';

describe('Service: Hpb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HpbService]
    });
  });

  it('should ...', inject([HpbService], (service: HpbService) => {
    expect(service).toBeTruthy();
  }));
});
