import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BroadcastService, MsalModule, MsalService } from '@azure/msal-angular';
import { BcAlertModule } from '@bancolombia/design-system-web/bc-alert';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { IPhotoMicrosoftGateway } from 'src/app/features/home/domain/models/photo-microsoft/gateway/photo-microsoft.gateway';
import { IProfileMicrosoftGateway } from 'src/app/features/home/domain/models/profile-microsoft/gateway/profile-microsoft.gateway';
import { PhotoMicrosoftUseCase } from 'src/app/features/home/domain/usecases/photo-microsoft/photo-microsoft.usecase';
import { ProfileMicrosoftUseCase } from 'src/app/features/home/domain/usecases/profile-microsoft/profile-microsoft.usecase';
import { PhotoMicrosoftService } from 'src/app/features/home/infrastructure/driven-adapter/photo-microsoft/photo-microsoft.service';
import { ProfileMicrosoftService } from 'src/app/features/home/infrastructure/driven-adapter/profile-microsoft/profile-microsoft.service';
import { environment } from '../../../environments/environment';

import { MainComponent } from './main.component';



@Component({
  selector: 'app-test-component',
  template: '', 
})
class TestComponent {}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let router: Router;
  const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      children: [
        {
          path: 'home',
          component: TestComponent,
        },
        {
          path: 'component-catalogue',
          component: TestComponent,
        },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        BcAlertModule,
        BcIconModule.forRoot({
          path: '',
        }),
        MsalModule.forRoot({
          auth: {
            clientId: environment.client_id,
            redirectUri: 'http://localhost:4200/',
          },
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MainComponent, TestComponent],
      providers: [
        MsalService,
        BroadcastService,
        PhotoMicrosoftUseCase,
        IPhotoMicrosoftGateway,
        {
          provide: IPhotoMicrosoftGateway,
          useClass: PhotoMicrosoftService,
        },
        ProfileMicrosoftUseCase,
        IProfileMicrosoftGateway,
        {
          provide: IProfileMicrosoftGateway,
          useClass: ProfileMicrosoftService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate to home', () => {
    spyOnProperty<any>(router, 'url').and.returnValue('/home');
    router.initialNavigation();
    expect(component.currentUrl).toEqual(true);
  });

  it('should onChangeTheme()', () => {
    const theme ='Bancolombia Dark';
    const themeCss ='black.css';
    const spy1 = spyOn(component,'onChangeTheme').and.callThrough();
    component.onChangeTheme(theme);
    expect(theme === 'Bancolombia Dark').toBeTruthy();
    expect(spy1).toHaveBeenCalled();
  });  
});
