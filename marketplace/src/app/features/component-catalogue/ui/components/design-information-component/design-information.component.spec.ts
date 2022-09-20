import { UpdateComponentUseCase } from 'src/app/features/component-catalogue/domain/usecases/update-component/update-component.usecase';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignInformationComponent } from './design-information.component';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { Observable, of } from 'rxjs';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';
import { GeneralComponentsModule } from 'src/app/core/ui/general-components/general-components.module';

import { ComponentsModule } from 'src/app/features/component-catalogue/ui/components/components.module';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
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
    throw new Error('Method not implemented.');
  }
  getComponentById(id: string): Observable<IComponentModel> {
    throw new Error('Method not implemented.');
  }
}
describe('DesignInformationComponent', () => {
  let component: DesignInformationComponent;
  let fixture: ComponentFixture<DesignInformationComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [GeneralComponentsModule, ComponentsModule],
      providers: [
        UpdateComponentUseCase,
        
        {
          provide: ComponentGateway,
          useClass: ComponentMockService,
        },
      ],
    }).compileComponents();
  });
  
  beforeEach(() => {
    USER_PERMISSIONS_DATA['flat-permissions'] = ['component-catalogue|update-component|ui'];
    fixture = TestBed.createComponent(DesignInformationComponent);
    component = fixture.componentInstance;
    component.data = { ...GENERIC_RESPONSE.data[0], infoType: 'usability' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
