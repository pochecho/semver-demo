import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BroadcastService, MsalModule, MsalService } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TokenService } from './core/infraestructure/driven-adapter/token.service';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  environment.environmentName = 'PDN';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MsalModule.forRoot({
          auth: {
            clientId: environment.client_id,
            redirectUri: 'http://localhost:4200/',
          },
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent],
<<<<<<< HEAD
      providers: [
        { provide: MsalService, useClass: MockMsalService },
        BroadcastService,
        MsalService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,

          deps: [TokenService, Router, environment.production ? MsalService : LocalMsalServiceService],
          multi: true,
        },
      ],
=======
      providers: [{ provide: MsalService, useClass: MockMsalService }, BroadcastService, TokenService],
>>>>>>> parent of 1aeee70d1... Merged PR 519857: Actualización angular/cli@12
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.env.production = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method to set token', () => {
    component.env.production = true;
<<<<<<< HEAD
    const spy = spyOn(component.authService, 'getAccount');
    component.updateToken();
    expect(spy).toHaveBeenCalled();
  });
=======
    const spy = spyOn(component.authService,'getAccount');
    component.updateToken();
    expect(spy).toHaveBeenCalled();
  });

>>>>>>> parent of 1aeee70d1... Merged PR 519857: Actualización angular/cli@12
});

class MockMsalService {
   

  acquireTokenSilent(param: any): Promise<any> {
    return Promise.resolve({ idToken: 'idToken' });
  }
  acquireTokenPopup(param: any): Promise<any> {
    return Promise.resolve({ idToken: 'idToken' });
  }
  getAccount() {
    return ({ idToken: 'idToken' });
  }
  
}
