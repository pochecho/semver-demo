import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BcIconModule } from '@bancolombia/design-system-web/bc-icon';
import { BcInputModule } from '@bancolombia/design-system-web/bc-input';
import { BcInputFileModule } from '@bancolombia/design-system-web/bc-input-file';
import { BcPreloaderModule } from '@bancolombia/design-system-web/bc-preloader';
import { BcDialogService, BcServicesModule } from '@bancolombia/design-system-web/bc-services';
import { Observable, of } from 'rxjs';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';
import { ImplementationGateway } from '../../../domain/models/implementation/gateway/implementation.gateway';
import { IImplementationModel } from '../../../domain/models/implementation/implementation.model';
import { UploadImageUseCase } from '../../../domain/usecases/upload-image/upload-image.usecase';
import { UploadImplementationUsecase } from '../../../domain/usecases/upload-implementation/upload-implementation.usecase';
import { UploadImplementationBackComponent } from './upload-implementation-back.component';

const GENERIC_RESPONSE = {
  code: '200',
  status: 'OK',
  data: [
    {
      documentation: {
        aria: 'section class',
        anatomy: 'section class',
        rules: 'section class',
        specifications: 'section class',
        states: 'section class',
        interaction: 'section class',
        themes: 'section class',
      },
      nameComponent: 'Alert',
      implementations: {},
      status: '',
      image: {
        preview:
          'https://nu0065001-galatea-dev-catalog-bucket.s3.amazonaws.com/components/Alert/images/alert-preview.jpg',
      },
      id: '5c513aee-14a2-4eca-976a-3da4e873e601',
      tags: ['Mobile', 'Web', 'Molécula'],
    },
  ],
};

class ComponentMockService extends ComponentGateway {
  getAll(): Observable<IComponentModel[]> {
    throw new Error('Method not implemented.');
  }
  updateComponent(component: IComponentModel): Observable<IComponentModel> {
    return of(GENERIC_RESPONSE.data[0]);
  }
  uploadComponent(component: IUploadComponentModel): Observable<IUploadComponentModel> {
    throw new Error('Method not implemented.');
  }
  uploadImage(file: File, name: string): Observable<string> {
    return of('fake/route/image.png');
  }
  getComponentById(id: string): Observable<IComponentModel> {
    throw new Error('Method not implemented.');
  }
}

class ImplementationMockService extends ImplementationGateway {
  getByTechnologyVersionAndId(params: any): Observable<IImplementationModel> {
    throw new Error('Method not implemented.');
  }
  getLatestTechnologyByIdComponent(idComponent: string): Observable<IImplementationModel[]> {
    throw new Error('Method not implemented.');
  }
  getVersionsComponent(id: string): Observable<{ [index: string]: string[] }> {
    throw new Error('Method not implemented.');
  }
  uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
    return of('success');
  }
}
describe('UploadImplementationBackComponent', () => {
  let component: UploadImplementationBackComponent;
  let fixture: ComponentFixture<UploadImplementationBackComponent>;
  let componentService: UploadImageUseCase;
  let implService: UploadImplementationUsecase;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadImplementationBackComponent],
      providers: [
        BcDialogService,
        UploadImageUseCase,
        UploadImplementationUsecase,
        {
          provide: ComponentGateway,
          useClass: ComponentMockService,
        },
        {
          provide: ImplementationGateway,
          useClass: ImplementationMockService,
        },
      ],
      imports: [
        BcInputFileModule,
        BcInputModule,
        ReactiveFormsModule,
        BcPreloaderModule,
        BcServicesModule,
        BcIconModule.forRoot({
          path: '',
        }),
      ],
    })
    .compileComponents();
    componentService = TestBed.inject(UploadImageUseCase);
    implService = TestBed.inject(UploadImplementationUsecase);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImplementationBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change the value of alertStatus', () => {
    const expectedAlertValue = 'Alerta inline cerrada';
    component.closed();
    expect(component.alertInlineStatus).toEqual(expectedAlertValue);
  });
  it('should get the expected File', () => {
    let blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'fakeFileName';
    let blobAnother = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'fakeFileNameAnother';
    const mockFile = [<File>blob, <File>blobAnother];

    component.getFilesAdded(mockFile);
    expect(component.entryFile.name).toEqual('fakeFileNameAnother');
  });
  it('should get the expected route and technology', () => {
    component.data = { id: '5.8.13' };
    const implData = component.setImplComponentValues('weincodeTest');
    expect(implData.technology).toEqual('java');
    expect(implData.apiSwagger).toEqual('weincodeTest');
  });
  it('should get the expected route and technology', () => {
    component.setValuesAlert('Example title', 'example content', 'success');
    expect(component.titleAlert).toEqual('Example title');
  });
  it('should get the expected route', (done) => {
    let blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'fakeFileName';
    const mockFile = [<File>blob];
    component.data = { id: '5.8.13', nameComponent: 'weincodeComponent' };
    component.getFilesAdded(mockFile);
    const expectedRoute = 'fake/route/image.png';

    spyOn(componentService, 'invoke').and.callFake(() => {
      return of(expectedRoute);
    });
    spyOn(component, 'doUploadImage').and.callThrough();
    const someUrl = component.doUploadImage();
    someUrl.then((currentUrl) => {
      expect(currentUrl).toEqual(expectedRoute);
      expect(componentService.invoke).toHaveBeenCalled();
      done();
    });
  });
  it('should get the expected route implementation', (done) => {
    let blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'fakeFileName';
    const mockFile = [<File>blob];
    component.data = { id: '5.8.13', nameComponent: 'weincodeComponent' };
    component.getFilesAdded(mockFile);
    const expectedRoute = 'fake/route/image.png';
    spyOn(component, 'open').and.callFake(() => null);
    spyOn(componentService, 'invoke').and.callFake(() => {
      return of(expectedRoute);
    });
    spyOn(implService, 'invoke').and.callFake(() => {
      return of(expectedRoute);
    });
    spyOn(component, 'doUploadImage').and.callThrough();
    const someUploadedImpl = component.uploadImplementation();
    someUploadedImpl.then((uploadImplRes) => {
      expect(uploadImplRes).toBeUndefined();
      expect(implService.invoke).toHaveBeenCalled();
      done();
    });
  });
});
