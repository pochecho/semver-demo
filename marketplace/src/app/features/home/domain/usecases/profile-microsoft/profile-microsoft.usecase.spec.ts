import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ProfileMicrosoftService } from "../../../infrastructure/driven-adapter/profile-microsoft/profile-microsoft.service";
import { IProfileMicrosoftGateway } from "../../models/profile-microsoft/gateway/profile-microsoft.gateway";
import { IProfileMicrosoftModel } from "../../models/profile-microsoft/profile-microsoft.model";
import { ProfileMicrosoftUseCase } from "./profile-microsoft.usecase";

const mockDummy: IProfileMicrosoftModel ={
    displayName: '',
    givenName: '',
    jobTitle: '',
    mail: '',
    mobilePhone: '',
    officeLocation: '',
    surname: '',
    userPrincipalName: ''
};

describe('PhotoMicrosoftUseCase', () => {
    let service: ProfileMicrosoftUseCase;
    const serviceSpy = jasmine.createSpyObj('Service', ['invoke']);
    serviceSpy.invoke.and.returnValue(of(mockDummy));
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            {
              provide: ProfileMicrosoftUseCase,
              useValue: serviceSpy
            },
          {
            provide: IProfileMicrosoftGateway,
            useClass: ProfileMicrosoftService,
          },
        ],
      });
      service = TestBed.inject(ProfileMicrosoftUseCase);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('invoke get data and return data subscribe', ()=>{
      service.invoke().subscribe( value =>{
        expect(value).toEqual(mockDummy);
      });
    });

});
