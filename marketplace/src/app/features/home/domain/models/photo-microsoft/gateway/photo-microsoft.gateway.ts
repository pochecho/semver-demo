import {Observable} from 'rxjs';

export abstract class IPhotoMicrosoftGateway {
  abstract getPhotoMicrosoft(): Observable<any>;
}
