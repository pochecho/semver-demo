import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsModule } from '../components.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiBackComponent } from './api-back.component';
import { ParamsUploadImage, UploadImageUseCase } from '../../../domain/usecases/upload-image/upload-image.usecase';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { Observable, of } from 'rxjs';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';
import { GetVersionsComponentsUsecase } from '../../../domain/usecases/get-versions-components/get-versions-components.usecase';
import { ImplementationGateway } from '../../../domain/models/implementation/gateway/implementation.gateway';
import { IImplementationModel } from '../../../domain/models/implementation/implementation.model';
import { GetComponentImplementationByVersionUsecase } from '../../../domain/usecases/get-component-implementation-by-version/get-component-implementation-by-version.usecase';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { CLICK_EVENT } from 'projects/ng_bds/bc-behaviors/behaviors/organisms/bc-input-file/bc-input-file-constants';

const versionsByTech = {
  angular: ['2.0.26', '2.0.27'],
};

const implementation = {
  technology: 'angular',
} as IImplementationModel;
class ImplementationMock extends ImplementationGateway {
  uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getVersionsComponent(id: string): Observable<{ [index: string]: string[] }> {
    return of(versionsByTech);
  }
  getByTechnologyVersionAndId(params: any): Observable<IImplementationModel> {
    return of(implementation);
  }
  getLatestTechnologyByIdComponent(idComponent: string): Observable<IImplementationModel[]> {
    const response: IImplementationModel[] = [
      {
        technology: 'flutter',
        components: null,
      },
      {
        technology: 'angular',
        components: null,
      },
    ];
    return of(response);
  }
}

class ComponentMock extends ComponentGateway {
  updateComponent(component: IComponentModel): Observable<IComponentModel> {
    throw new Error('Method not implemented.');
  }
  uploadComponent(component: IUploadComponentModel): Observable<IUploadComponentModel> {
    throw new Error('Method not implemented.');
  }
  uploadImage(file: File, name: string): Observable<string> {
    return of('fake/route/image.png');
  }
  getAll(): Observable<IComponentModel[]> {
    throw new Error('Method not implemented.');
  }
  getComponentById(id: string): Observable<IComponentModel> {
    const response: IComponentModel = {
      id: 'id',
      nameComponent: 'nameComponent',
      implementations: null,
      image: [],
      status: '',
      tags: [],
    };
    return of(response);
  }
}
describe('ApiBackComponent', () => {
  let component: ApiBackComponent;
  let fixture: ComponentFixture<ApiBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsModule, HttpClientModule],
      providers: [
        UploadImageUseCase,
        GetVersionsComponentsUsecase,
        GetComponentImplementationByVersionUsecase,
        {
          provide: ComponentGateway,
          useClass: ComponentMock,
        },
        {
          provide: ImplementationGateway,
          useClass: ImplementationMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(ApiBackComponent);
    component = fixture.componentInstance;

    component.data = {
      nameComponent: 'Accordion',
      id: '',
      image: [],
      status: '',
      tags: [],
      implementations: {
        flutter: {
          path: {
            white: {},
          },
          technology: 'flutter',
        },
        angular: {
          technology: 'angular',
          path: {
            white: {},
          },
        },
      },
    };
    fixture.detectChanges();
  });

  beforeAll(() => {
    USER_PERMISSIONS_DATA['flat-permissions'] = [
      'components-catalogue|upload-image|ui',
      'component-catalogue|get-versions-components|ui',
      'component-catalogue|get-component-implementation-by-version|ui',
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
