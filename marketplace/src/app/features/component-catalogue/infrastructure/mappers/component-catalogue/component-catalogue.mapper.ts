import { IComponentModel } from '../../../domain/models/component/component.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ComponentMapper  {
  fromMap(obj: any): IComponentModel {
    return {
      implementations: obj.implementations,
      image: obj.imagen,
      id: obj.id,
      nameComponent: obj.nameComponent,
      tags: obj.tags,
      status: obj.status
    };
  }
}
