import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComponentModel } from '../../models/component/component.model';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { filter, map } from 'rxjs/operators';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

interface Param {
  categories: Array<string>;
  noCategories?: Array<string>;
}

@Injectable()
export class UpdateComponentUseCase  {
  constructor(private componentGateWay: ComponentGateway) {}
  @Resource('component-catalogue|update-component|ui', USER_PERMISSIONS_DATA)
  invoke(component: IComponentModel): Observable<any> {
    return this.componentGateWay.updateComponent(component);
  }
}
