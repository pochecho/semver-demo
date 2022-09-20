import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_MICROSOFT } from 'src/app/core/infraestructure/constants/microservices.constants';
import { PhotoMicrosoftService } from './photo-microsoft.service';

describe('PhotoMicrosoftService', () => {
  let service: PhotoMicrosoftService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PhotoMicrosoftService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get success response status 200', fakeAsync(() => {
    const blob = new Blob(['ng_bancolombiaDesignSystem/src/assets/images/profile.png'], { type: 'image/png' });
    service.getPhotoMicrosoft().subscribe((resp) => {
      expect(resp).toEqual(blob);
    });

    const req = httpTestingController.expectOne(`${API_MICROSOFT}/me/photo/$value`);
    expect(req.request.method).toEqual('GET');
    req.flush(blob);
    httpTestingController.verify();
  }));

  it('should get success response status 404', fakeAsync(() => {
    service.getPhotoMicrosoft().subscribe((resp) => {
      expect(resp).toEqual(null);
    });

    const req = httpTestingController.expectOne(`${API_MICROSOFT}/me/photo/$value`);
    expect(req.request.method).toEqual('GET');
    req.flush(null);
    httpTestingController.verify();
  }));
});
