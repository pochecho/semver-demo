import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { API_MICROSOFT } from 'src/app/core/infraestructure/constants/microservices.constants';
import { ProfileMicrosoftService } from './profile-microsoft.service';

describe('ProfileMicrosoftService', () => {
  let service: ProfileMicrosoftService;
  let httpTestingController: HttpTestingController;
  const objSevice = {
    code: {
      code: 200,
      message: 'OK',
    },
    data: {
      displayName: 'Ricardo',
      givenName: 'Ricardo',
      jobTitle: 'Personal',
      mail: 'Ricardo',
      mobilePhone: 'Ricardo',
      officeLocation: 'Ricardo',
      surname: 'Ricardo',
      userPrincipalName: 'Ricardo',
    },
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProfileMicrosoftService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get success response status 200', fakeAsync(() => {
    service.getProfileMicrosoft().subscribe((res) => {
      expect(res.displayName).toEqual(undefined);
    });
    const req = httpTestingController.expectOne(`${API_MICROSOFT}/me`);
    expect(req.request.method).toEqual('GET');
    req.flush(objSevice);
    httpTestingController.verify();
  }));

  it('get success response status 404', fakeAsync(() => {
    service.getProfileMicrosoft().subscribe((res) => {
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_MICROSOFT}/me`);
    expect(req.request.method).toEqual('GET');
    req.flush(null);
    httpTestingController.verify();
  }));

  it('get success response status error', fakeAsync(() => {
    service.getProfileMicrosoft().subscribe((res) => {
      expect(res).toEqual(null);
    });
    const req = httpTestingController.expectOne(`${API_MICROSOFT}/me`);
    const errores = new Error();
    expect(req.request.method).toEqual('GET');
    req.flush(errores, {
      status: 404,
      statusText: 'Network error',
    });
    httpTestingController.verify();
  }));
});

