import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { PhotoMicrosoftService } from "../../../infrastructure/driven-adapter/photo-microsoft/photo-microsoft.service";
import { IPhotoMicrosoftGateway } from "../../models/photo-microsoft/gateway/photo-microsoft.gateway";
import { PhotoMicrosoftUseCase } from "./photo-microsoft.usecase";

describe('PhotoMicrosoftUseCase', () => {
    let service: PhotoMicrosoftUseCase;
    const serviceSpy = jasmine.createSpyObj('Service', ['invoke']);
    serviceSpy.invoke.and.returnValue(of('mock value as requires'));

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            {
              provide: PhotoMicrosoftUseCase,
              useValue: serviceSpy
            },
          {
            provide: IPhotoMicrosoftGateway,
            useClass: PhotoMicrosoftService,
          },
        ],
      });
      service = TestBed.inject(PhotoMicrosoftUseCase);
    });

    it('invoke get data and return data subscribe', ()=>{
      service.invoke().subscribe( value =>{
        expect(value.length).toBeGreaterThan(0);
      });
    });

});
