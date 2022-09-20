
import { TestBed, waitForAsync } from '@angular/core/testing';

import { GetComponentsUsecase } from './get-components.usecase';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { ComponentService } from '../../../infrastructure/driven-adapter/components/components.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { IComponentModel } from '../../models/component/component.model';
import { of } from 'rxjs';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';


describe('GetComponentsUsecase', () => {
  let component: GetComponentsUsecase;
  let service: ComponentGateway;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        GetComponentsUsecase,
        {
          provide: ComponentGateway,
          useClass: ComponentService,
        },
        TokenService
      ],
      schemas: [
      ]
    })
      .compileComponents();

    component = TestBed.inject(GetComponentsUsecase);
    service = TestBed.inject(ComponentGateway);

  }));

  beforeAll(() => {
    USER_PERMISSIONS_DATA['flat-permissions'] = [
      'component-catalogue|get-components|ui'
    ]
  })
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke getAll', (done) => {

    const params = {
      categories: ["angular"],
      noCategories: []
    };

    const components = [];

    for (let i = 0; i < 14; i++) {
      components.push(
        {
          implementations: {},
          image: [],
          id: i,
          nameComponent: "component",
          tags: ["angular"],
          status: "",
        }
      )
    }

    const spy = spyOn(service, 'getAll').and.callFake(() => {
      return of(components as IComponentModel[]);
    });

    const invoke = component.invoke(params);
    invoke.subscribe((response) => {
      expect(response["angular"][0].length).toBe(components.length);
      expect(spy).toHaveBeenCalled();
      done();
    });

  });

});
