import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { IUploadComponentModel } from '../../models/component/upload-component.model';

@Injectable()
export class UploadComponentUseCase {
  constructor(private componentGateWay: ComponentGateway) {}
  @Resource('component-catalogue|register-component|ui', USER_PERMISSIONS_DATA)
  invoke(component: IUploadComponentModel): Observable<any> {
    return this.componentGateWay.uploadComponent(component);
  }
}