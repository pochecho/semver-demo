import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { IComponentModel } from '../../models/component/component.model';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';
import { map } from 'rxjs/operators';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';

@Injectable()
export class GetComponentByIdUsecase  {
  constructor(private componentGateWay: ComponentGateway, private implementationGateway: ImplementationGateway) {}
  @Resource('component-catalogue|get-component-by-id|ui', USER_PERMISSIONS_DATA)
  invoke(id: string): Observable<IComponentModel> {
    const $implementations = this.implementationGateway.getLatestTechnologyByIdComponent(id);
    const $component = this.componentGateWay.getComponentById(id);
    return zip($component, $implementations).pipe(
      map((zipped) => {
        const response = { ...zipped[0] };
        if (zipped[1]) {
          response.implementations = {};
          for (const implementation of zipped[1]) {
            response.implementations[implementation.technology] = implementation;
          }
        }
        return response;
      })
    );
  }
}
