import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { ValidateOAuthTermsGateway } from '../../../../features/terms-and-conditions/domain/models/oauth-terms/gateway/validate-oauth-terms.gateway';
import { OAuthTermsConditionsUseCase } from '../../../../features/terms-and-conditions/domain/usecases/validate-oauth-terms/validate-oauth-terms.usecase';
import { OauthTermsService } from '../../../../features/terms-and-conditions/infrastructure/driven-adapter/oauth-terms/oauth-terms.service';
import { TokenService } from '../../../infraestructure/driven-adapter/token.service';
import { HasPermissionGuard } from './has-permission.guard';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

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

describe('HasPermissionGuard', () => {
  let injector: TestBed;
  let guard: HasPermissionGuard;
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

        { provide: TokenService, useClass: TokenServiceFake },
        { provide: Router, useValue: routerMock },
        OAuthTermsConditionsUseCase,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    injector = getTestBed();
    guard = TestBed.inject(HasPermissionGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  beforeAll(() => {
    USER_PERMISSIONS_DATA['flat-permissions'] = ['Iden001'];
  });
  it('should return true when it has permission', () => {
    const route: Route = {
      data: {
        identifier: 'Iden001',
      },
    };
    const response = guard.canLoad(route, null);
    expect(response).toBeTrue();
  });
});
