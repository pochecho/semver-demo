import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { API_URL_COMPONENT_CATALOGUE } from 'src/app/core/infraestructure/constants/microservices.constants';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { ComponentService } from './components.service';

describe('ComponentService', () => {
  let service: ComponentService;
  let httpTestingController: HttpTestingController;

  const objSevice = {
    code: {
      code: 200,
      message: 'OK',
    },
    data: {
      implementations: [],
      image: [],
      id: 'obj.id',
      nameComponent: 'Onboarding',
      tags: ['Mobile', 'Átomo'],
      status: '',
    },
  };
  const objSeviceError = {
    code: {
      code: 404,
      message: 'Not found',
    },
    data: {
      implementations: [],
      image: [],
      id: 'obj.id',
      nameComponent: 'Onboarding',
      tags: ['Mobile', 'Átomo'],
      status: '',
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComponentService,TokenService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(ComponentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get success response status 200', fakeAsync(() => {
    service.getAll().subscribe((res) => {
      expect(res).toBeDefined();
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/components/overview/summary`);
    expect(req.request.method).toEqual('GET');
  }));

  it('get success response status 404', fakeAsync(() => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/components/overview/summary`);
    expect(req.request.method).toEqual('GET');
    req.flush(objSeviceError);
    httpTestingController.verify();
  }));
  it('get success response status error', fakeAsync(() => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/components/overview/summary`);
    const errores = new Error();
    expect(req.request.method).toEqual('GET');
    req.flush(errores);
    httpTestingController.verify();
  }));
});
