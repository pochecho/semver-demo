import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { ImplementationGateway } from '../../models/implementation/gateway/implementation.gateway';

@Injectable()
export class GetVersionsComponentsUsecase  {
  constructor(private implementationGateway: ImplementationGateway) {}
  
  @Resource('component-catalogue|get-versions-components|ui', USER_PERMISSIONS_DATA)
  invoke(id: string): Observable<any> {
    return this.implementationGateway.getVersionsComponent(id).pipe(
      map((versions) => {
        const response = {};
        for (const tech in versions) {
          if (Object.prototype.hasOwnProperty.call(versions, tech)) {
            const element = versions[tech];
            response[tech] = [...new Set(element)];
          }
        }
        return response;
      })
    );
  }
}
