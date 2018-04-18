/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompAuthService } from './comp-auth.service';

describe('CompAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompAuthService]
    });
  });

  it('should ...', inject([CompAuthService], (service: CompAuthService) => {
    expect(service).toBeTruthy();
  }));
});
