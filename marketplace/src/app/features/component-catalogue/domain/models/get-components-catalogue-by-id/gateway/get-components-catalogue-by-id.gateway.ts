import { Observable } from 'rxjs';
import { IComponentModel } from '../../component/component.model';

export abstract class GetComponentsCatalogueByIdGateway {
  abstract getById(id): Observable<IComponentModel>;
}
