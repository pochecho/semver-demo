import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';
import { IImplementationModel } from '../../models/implementation/implementation.model';

@Injectable()
export class UploadImplementationUsecase {
  constructor(private implementation: ImplementationGateway) {}
  invoke(impl: IImplementationModel): Observable<any> {
    return this.implementation.uploadImplementationComponent(impl);
  }
}
