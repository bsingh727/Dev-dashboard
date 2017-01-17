import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthService } from './auth.service';

describe('AuthService (Mocked)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,

        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct', async(inject(
    [AuthService, MockBackend], (service, mockBackend) => {

    expect(service).toBeDefined();
  })));

  it('should check whether the response is not nul', async(inject(
      [AuthService, MockBackend], (service, mockBackend) => {
      let result = service.details();
      expect(result).not.toBe(null);
  })));
});
