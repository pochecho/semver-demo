import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BcInputSelectModule } from '@bancolombia/design-system-web/bc-input-select';
import { Observable, of } from 'rxjs';
import { ComponentGateway } from '../../../../../features/component-catalogue/domain/models/component/gateway/component.gateway';
import { ImplementationGateway } from '../../../../../features/component-catalogue/domain/models/implementation/gateway/implementation.gateway';
import { IImplementationModel } from '../../../../../features/component-catalogue/domain/models/implementation/implementation.model';
import { GetComponentImplementationByVersionUsecase } from '../../../../../features/component-catalogue/domain/usecases/get-component-implementation-by-version/get-component-implementation-by-version.usecase';
import { DevelopInformationComponent } from './develop-information.component';
import { IUploadComponentModel } from 'src/app/features/component-catalogue/domain/models/component/upload-component.model';
import { TechnologiesBulletComponent } from 'src/app/core/ui/general-components/technologies-bullet/technologies-bullet.component';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { GetVersionsComponentsUsecase } from '../../../domain/usecases/get-versions-components/get-versions-components.usecase';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

const versionsByTech = {
  angular: ['2.0.26', '2.0.27'],
  native: ['2.0.13', '2.0.12'],
  flutter: ['1.2.10', '1.2.11'],
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
    throw new Error('Method not implemented.');
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

describe('DevelopInformationComponent', () => {
  let component: DevelopInformationComponent;
  let fixture: ComponentFixture<DevelopInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevelopInformationComponent, TechnologiesBulletComponent],
      providers: [
        GetVersionsComponentsUsecase,
        GetComponentImplementationByVersionUsecase,
        {
          provide: ImplementationGateway,
          useClass: ImplementationMock,
        },
        {
          provide: ComponentGateway,
          useClass: ComponentMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [BcInputSelectModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopInformationComponent);
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

  beforeAll(()=>{
    USER_PERMISSIONS_DATA['flat-permissions'] = [
      'component-catalogue|get-versions-components|ui',
      'component-catalogue|get-component-implementation-by-version|ui'
    ]
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onSelectTech', () => {
    const spy = spyOn(component, 'onSelectTech').and.callThrough();

    component.onSelectTech('angular');
    expect(spy).toHaveBeenCalled();
  });

  it('Should update the currentImplementation when onSelectVersion method is Called', (done) => {
    component.onSelectVersion('2.0.27');
    setTimeout(() => {
      expect(component.currentImplementation.technology).toBe(component.currentTech);
      done();
    }, 100);
  });
});
