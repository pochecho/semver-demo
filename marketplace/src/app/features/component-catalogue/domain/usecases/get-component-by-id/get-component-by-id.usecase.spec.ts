import { async, TestBed } from '@angular/core/testing';

import { GetComponentByIdUsecase } from './get-component-by-id.usecase';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { ComponentService } from '../../../infrastructure/driven-adapter/components/components.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';
import { ImplementationService } from '../../../infrastructure/driven-adapter/implementation/implementation.service';
import { Observable, of } from 'rxjs';
import { IComponentModel } from '../../models/component/component.model';
import { IImplementationModel } from '../../models/implementation/implementation.model';
import { IUploadComponentModel } from '../../models/component/upload-component.model';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

class ImplementationMock extends ImplementationGateway {
  uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getVersionsComponent(id: string): Observable<{ [index: string]: string[]; }> {
    throw new Error('Method not implemented.');
  }
  getByTechnologyVersionAndId(params: any): Observable<IImplementationModel> {
    throw new Error('Method not implemented.');
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
describe('GetComponentByIdUsecase', () => {
  let getComponentByIdUsecase: GetComponentByIdUsecase;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [
        GetComponentByIdUsecase,
        TokenService,
        {
          provide: ComponentGateway,
          useClass: ComponentMock,
        },
        {
          provide: ImplementationGateway,
          useClass: ImplementationMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    getComponentByIdUsecase = TestBed.inject(GetComponentByIdUsecase);
  }));

  beforeEach(() => {});

  beforeAll(()=>{
    USER_PERMISSIONS_DATA['flat-permissions'] = [
      'component-catalogue|get-component-by-id|ui'
    ]
  })
  it('should create the usecase', () => {
    expect(getComponentByIdUsecase).toBeTruthy();
  });

  it('should return a component with the correct tech parsed', (done)=>{
    const $data = getComponentByIdUsecase.invoke('');
    $data.subscribe((data) => {

      expect(data.implementations['angular']).toBeTruthy();
      done();
    })
  })
});
