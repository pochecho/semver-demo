import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { API_URL_COMPONENT_CATALOGUE } from 'src/app/core/infraestructure/constants/microservices.constants';
import { TokenService } from '../../../../../core/infraestructure/driven-adapter/token.service';
import { ImplementationService } from './implementation.service';

describe('ImplementationService', () => {
  let service: ImplementationService;
  let httpTestingController: HttpTestingController;

  const impl = {
    implementations: [],
    image: [],
    id: 'obj.id',
    nameComponent: 'Onboarding',
    tags: ['Mobile', 'Átomo'],
    status: '',
    version: '2.0.2',
    technology: 'angular',
  };
  const objSevice = {
    code: {
      code: 200,
      message: 'OK',
    },
    data: [impl]
  };

  const objSeviceSingle = {
    code: {
      code: 200,
      message: 'OK',
    },
    data: impl
  };

  const objSeviceError = {
    code: {
      code: 404,
      message: 'Not found',
    },
    data: [impl]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService],
    });
    service = TestBed.inject(ImplementationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get success response status 200', fakeAsync(() => {
    service.getByTechnologyVersionAndId(impl).subscribe((res) => {
      expect(res).toEqual(impl);
    });
    const req = httpTestingController.expectOne(
      `${API_URL_COMPONENT_CATALOGUE}/implementations/technology/version?technology=${impl.technology}&version=${impl.version}&idComponent=${impl.id}`
    );
    req.flush(objSevice);
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  }));

  it('get success response status 404', fakeAsync(() => {
    service.getByTechnologyVersionAndId(impl).subscribe((res) => {
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(
      `${API_URL_COMPONENT_CATALOGUE}/implementations/technology/version?technology=${impl.technology}&version=${impl.version}&idComponent=${impl.id}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(objSeviceError);
    httpTestingController.verify();
  }));

  it('get success response status error', fakeAsync(() => {
    service.getByTechnologyVersionAndId(impl).subscribe((res) => {
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(
      `${API_URL_COMPONENT_CATALOGUE}/implementations/technology/version?technology=${impl.technology}&version=${impl.version}&idComponent=${impl.id}`
    );
    const errores = new Error();
    expect(req.request.method).toEqual('GET');
    req.flush(errores);
    httpTestingController.verify();
  }));



  it('should get success response with status 200', fakeAsync(() => {
    service.getVersionsComponent(impl.id).subscribe((res)=>{
      expect(res.id).toEqual(impl.id);
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/implementations/versions/${impl.id}`);
    expect(req.request.method).toEqual("GET");
    req.flush(objSeviceSingle);
    httpTestingController.verify();
  }));

  it('get success response with status 404', fakeAsync(() => {
    service.getVersionsComponent(impl.id).subscribe((res)=>{
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/implementations/versions/${impl.id}`);
    expect(req.request.method).toEqual("GET");
    req.flush(objSeviceError);
    httpTestingController.verify();
  }));

  it('get success response with status error', fakeAsync(() => {
    service.getVersionsComponent(impl.id).subscribe((res)=>{
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/implementations/versions/${impl.id}`);
    const errores = new Error();
    expect(req.request.method).toEqual("GET");
    req.flush(errores);
    httpTestingController.verify();
  }));
  it('uploadImplementationComponent', fakeAsync(() => {
    service.uploadImplementationComponent(impl).subscribe((res)=>{
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_URL_COMPONENT_CATALOGUE}/implementations`);
    const errores = new Error();
    expect(req.request.method).toEqual("POST");
    req.flush(errores);
    httpTestingController.verify();
  }));

});
