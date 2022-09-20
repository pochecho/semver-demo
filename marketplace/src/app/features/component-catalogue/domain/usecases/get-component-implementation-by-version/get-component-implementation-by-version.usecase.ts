import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ImplementationGateway} from "../../models/implementation/gateway/implementation.gateway";
import { IImplementationModel } from '../../models/implementation/implementation.model';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

@Injectable()
export class GetComponentImplementationByVersionUsecase {
  constructor(private componentGateWay: ImplementationGateway) {}

  @Resource('component-catalogue|get-component-implementation-by-version|ui', USER_PERMISSIONS_DATA)
  invoke(params): Observable<IImplementationModel> {
    return this.componentGateWay.getByTechnologyVersionAndId(params);
  }
}