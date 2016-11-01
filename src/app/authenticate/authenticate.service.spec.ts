/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Authenticate } from './authenticate.service';

describe('Service: SignIn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authenticate]
    });
  });

  it('should ...', inject([Authenticate], (service: Authenticate) => {
    expect(service).toBeTruthy();
  }));
});
