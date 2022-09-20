import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { initializeApp } from './app.initializer';
import { USER_PERMISSIONS_DATA } from './app.permission';
import { LocalMsalServiceService } from './core/infraestructure/driven-adapter/local-msal-service.service';
import { TokenService } from './core/infraestructure/driven-adapter/token.service';
import { UserGateway } from './features/authorization/domain/models/user/user.gateway';
import { GetUserInformationUsecase } from './features/authorization/domain/usecases/get-user-information/get-user-information.usecase';
import { UserService } from './features/authorization/infrastructure/driven-adapters/user/user.service';

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

describe('initializeApp', () => {
  let injector: TestBed;

  let getUserInformationUsecase: GetUserInformationUsecase;
  let tokenService: TokenService;
  let authService: LocalMsalServiceService;

  beforeEach(() => {
    sessionStorage.setItem('msal.idtoken', tokenString);

    TestBed.configureTestingModule({
      providers: [

        {
          provide: UserGateway,
          useClass: UserService,
        },
        GetUserInformationUsecase,
        LocalMsalServiceService,
        TokenService,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    injector = getTestBed();
    getUserInformationUsecase = injector.inject(GetUserInformationUsecase);
    tokenService = injector.inject(TokenService);
    authService = injector.inject(LocalMsalServiceService);
  });

  it('should redirect to a login view when the account is not valid', (done) => {
    spyOn(authService, 'getAccount').and.callFake(() => {
      return null;
    });

    const loginRedirect = spyOn(authService, 'loginRedirect').and.callFake(() => {});
    const callback = initializeApp(getUserInformationUsecase, tokenService, authService);
    callback().then(() => {
      expect(loginRedirect).toHaveBeenCalled();
      done();
    });
  });

  it('should request the user data when the account is valid', (done) => {
    spyOn(authService, 'getAccount').and.callFake(() => {
      return null;
    });

    spyOn(getUserInformationUsecase, 'invoke').and.callFake(() => {
      return of(null);
    });

    spyOn(tokenService, 'getTokenFromStorage').and.callFake(() => {
      return tokenString;
    });

    spyOn(tokenService, 'getTokenData').and.callFake(() => {
      return tokenGood;
    });
    localStorage.setItem('msal-status', 'pending');
    localStorage.setItem('msal.idtoken', JSON.stringify(tokenGood));

    environment.guards.enableRoleAndPermissions.value = true;
    const loginRedirect = spyOn(authService, 'loginRedirect').and.callFake(() => {});
    const callback = initializeApp(getUserInformationUsecase, tokenService, authService);
    callback().then(() => {
      expect(loginRedirect).not.toHaveBeenCalled();
      expect(USER_PERMISSIONS_DATA['permissions']).toEqual([]);
      done();
    });
  });
});
