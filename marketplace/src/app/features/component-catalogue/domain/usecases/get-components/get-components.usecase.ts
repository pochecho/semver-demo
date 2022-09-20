import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { Resource } from 'src/app/core/commons/decorators/identifier';
import { IComponentModel } from '../../models/component/component.model';
import { ComponentGateway } from '../../models/component/gateway/component.gateway';

interface Param {
  categories: Array<string>;
  noCategories?: Array<string>;
}

@Injectable()
export class GetComponentsUsecase {
  constructor(private componentGateWay: ComponentGateway) {}

  @Resource('component-catalogue|get-components|ui', USER_PERMISSIONS_DATA)
  invoke(param: Param): Observable<any> {

    const ITEMS_PER_PAGE = 14;
    return this.componentGateWay.getAll().pipe(
      map((components: IComponentModel[]) => {
        const response = {};

        for (const component of components) {
          const componentsTag = component.tags.filter((tag) => param.categories.includes(tag));
          const noComponentTag = param.noCategories
            ? component.tags.filter((tag) => param.noCategories.includes(tag))
            : [];

          if (componentsTag.length > 0 && noComponentTag.length == 0) {
            this.buildResponse(componentsTag, response, ITEMS_PER_PAGE, component);
          }
        }
        return response;
      })
    );
  }

  private buildResponse(componentsTag: any[], response: {}, ITEMS_PER_PAGE: number, component: IComponentModel) {
    for (const componentTag of componentsTag) {
      if (!Object.keys(response).includes(componentTag)) {
        response[componentTag] = [];
      }

      let pagesByComponent = response[componentTag].length;

      let lastAvailablePageIndex = pagesByComponent > 0 ? pagesByComponent - 1 : null;

      if (lastAvailablePageIndex == null) {
        response[componentTag].push([]);
        pagesByComponent = response[componentTag].length;
        lastAvailablePageIndex = pagesByComponent - 1;
      }
      let rest;
      if (response[componentTag][lastAvailablePageIndex].length > 0) {
        rest = response[componentTag][lastAvailablePageIndex].length % ITEMS_PER_PAGE;
      } else {
        rest = ITEMS_PER_PAGE;
      }
      if (rest > 0) {
        response[componentTag][lastAvailablePageIndex].push(component);
      } else {
        response[componentTag].push([component]);
      }
    }
  }
}
