import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';


export interface ParamsUploadImage {
  file : File,
  name : string
}

@Injectable()
export class UploadImageUseCase{
  constructor(private componentGateWay: ComponentGateway) {}
  @Resource('component-catalogue|upload-image|ui', USER_PERMISSIONS_DATA)
  invoke(params:ParamsUploadImage): Observable<any> {
    return this.componentGateWay.uploadImage(params.file, params.name);
  }
}
