import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { TokenService } from './token.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LocalMsalServiceService } from './local-msal-service.service';
import { MsalService } from '@azure/msal-angular';
describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      providers: [TokenService, { provide: MsalService, useClass: LocalMsalServiceService }],
    });
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
