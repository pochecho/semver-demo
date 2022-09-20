import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BcIconModule } from "@bancolombia/design-system-web/bc-icon";
import { BcModalModule } from "@bancolombia/design-system-web/bc-modal";
import { CoreModule } from '../../../../../core/core.module';
import { IPhotoMicrosoftGateway } from '../../../domain/models/photo-microsoft/gateway/photo-microsoft.gateway';
import { IProfileMicrosoftGateway } from '../../../domain/models/profile-microsoft/gateway/profile-microsoft.gateway';
import { PhotoMicrosoftUseCase } from '../../../domain/usecases/photo-microsoft/photo-microsoft.usecase';
import { ProfileMicrosoftUseCase } from '../../../domain/usecases/profile-microsoft/profile-microsoft.usecase';
import { PhotoMicrosoftService } from '../../../infrastructure/driven-adapter/photo-microsoft/photo-microsoft.service';
import { ProfileMicrosoftService } from '../../../infrastructure/driven-adapter/profile-microsoft/profile-microsoft.service';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcIconModule.forRoot({path: ''}), HttpClientModule,
        BcModalModule,
        CoreModule,
        RouterTestingModule
      ],
      declarations: [HomeComponent],
      providers: [
        IPhotoMicrosoftGateway,
        PhotoMicrosoftUseCase,
        IProfileMicrosoftGateway,
        ProfileMicrosoftUseCase,
        {
          provide: IPhotoMicrosoftGateway,
          useClass: PhotoMicrosoftService,
        },
        {
          provide: IProfileMicrosoftGateway,
          useClass: ProfileMicrosoftService,
        }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
