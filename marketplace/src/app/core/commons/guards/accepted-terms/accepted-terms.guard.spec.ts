import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserGateway } from 'src/app/features/authorization/domain/models/user/user.gateway';
import { GetUserInformationUsecase } from 'src/app/features/authorization/domain/usecases/get-user-information/get-user-information.usecase';
import { UserService } from 'src/app/features/authorization/infrastructure/driven-adapters/user/user.service';
import { ValidateOAuthTermsGateway } from '../../../../features/terms-and-conditions/domain/models/oauth-terms/gateway/validate-oauth-terms.gateway';
import { IOAuthModel } from '../../../../features/terms-and-conditions/domain/models/oauth-terms/oauth-terms.model';
import { OAuthTermsConditionsUseCase } from '../../../../features/terms-and-conditions/domain/usecases/validate-oauth-terms/validate-oauth-terms.usecase';
import { OauthTermsService } from '../../../../features/terms-and-conditions/infrastructure/driven-adapter/oauth-terms/oauth-terms.service';
import { TokenService } from '../../../infraestructure/driven-adapter/token.service';
import { AcceptedTermsGuard } from './accepted-terms.guard';

const tokenGood = {
  sub: '1234567890',
  name: 'Soy falso',
  preferred_username: 'Soy aún más falso',
  iat: 1516239022,
};
const tokenString =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNveSBmYWxzbyIsInByZWZlcnJlZF91c2VybmFtZSI6IlNveSBhw7puIG3DoXMgZmFsc28iLCJpYXQiOjE1MTYyMzkwMjJ9.LyBThzE4yESAV4u9aAh44iZ6Bg0Xfjk5xv9wuF3eARw';
class TokenServiceFake {
  account = { idToken: tokenGood };
  idToken = tokenString;
}

describe('AcceptedTermsGuard', () => {
  let injector: TestBed;
  let guard: AcceptedTermsGuard;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  const response: any = {
    code: {
      code: 200,
      message: 'OK',
    },
    data: {
      dateCreate: '2021-04-06',
      mail: 'pepitoperez@bancolombia.com.co',
      version: '1.0.3',
      user: 'prueba',
      isAccept: true,
      id: 'asd',
    },
  };

  beforeEach(() => {
    sessionStorage.setItem('msal.idtoken', tokenString);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ValidateOAuthTermsGateway,
          useClass: OauthTermsService,
        },
        {
          provide: UserGateway,
          useClass: UserService,
        },
        GetUserInformationUsecase,

        { provide: TokenService, useClass: TokenServiceFake },
        { provide: Router, useValue: routerMock },
        OAuthTermsConditionsUseCase,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    injector = getTestBed();
    guard = TestBed.inject(AcceptedTermsGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should create', () => {
    guard.environment.production = true;
    spyOn(guard.authTermsConditionsUseCase, 'invoke').and.callFake((data) => {
      return of({
        idToken: 'XXX',
      } as IOAuthModel);
    });
    expect(guard.canLoad(null, null)).toBeTruthy();
  });

  it('should return true', () => {
    guard.environment.production = true;
    spyOn(guard, 'acceptedTerms').and.returnValue(of(response));
    const result = guard.canLoad(null, null);
    expect(result).toBeTruthy();
    expect(guard.acceptedTerms).toHaveBeenCalled();
  });
});
