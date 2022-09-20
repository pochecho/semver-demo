import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';


describe('TokenService', () => {
  let service: TokenService;
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const DEFAULT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsb2NhbC1nYWxhdGVhQGJhbmNvbG9tYmlhLmNvbS5jbyIsIm5hbWUiOiJsb2NhbC1nYWxhdGVhIn0.njHo81Z3xWwEPn3YX_NXD_b4iKvP7CHRSEdidzVMo-k';
  const TOKEN_DATA = {
    sub: '1234567890',
    name: 'John Doe',
    iat: 1516239022
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });
    service = TestBed.inject(TokenService);
  });
  // Mock localStorage
  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should set and get token DATA', () => {
    service.setIdToken(TOKEN);
    expect(service.idToken).toEqual(TOKEN);
    localStorage.setItem('msal.idtoken', TOKEN);
    expect(service.getTokenData()).toEqual(TOKEN_DATA);
  });

  it('should get IDtoken from storage', () => {
    localStorage.setItem('msal.idtoken', TOKEN);
    let data = service.getTokenFromStorage();
    expect(data).toEqual(TOKEN);
    expect(service.tokenData).toEqual(TOKEN_DATA);
  });

  it('should set token with default value', () => {
    const TOKEN = undefined;
    service.setIdToken(TOKEN);
<<<<<<< HEAD
    expect(service.idToken).not.toEqual(DEFAULT_TOKEN);
=======
    expect(service.idToken).toEqual(DEFAULT_TOKEN);
>>>>>>> parent of 1aeee70d1... Merged PR 519857: Actualización angular/cli@12
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
