/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Auth.service.tsService } from './auth.service.ts.service';

describe('Service: Auth.service.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.service.tsService]
    });
  });

  it('should ...', inject([Auth.service.tsService], (service: Auth.service.tsService) => {
    expect(service).toBeTruthy();
  }));
});
