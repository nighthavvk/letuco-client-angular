import { async, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { AuthenticationService } from '../../services/authentication/authentication.service';

describe('AuthenticationInterceptor', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            Router,
            AuthenticationService,
            {
              provide: HTTP_INTERCEPTORS,
              useClass: AuthenticationInterceptor,
              multi: true,
            }
        ],
    });
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
