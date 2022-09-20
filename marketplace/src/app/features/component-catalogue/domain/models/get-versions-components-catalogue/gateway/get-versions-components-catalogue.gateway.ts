import { Observable } from 'rxjs';
import { IComponentModel } from '../../component/component.model';

export abstract class GetVersionsComponentsCatalogueGateway {
  abstract getById(id): Observable<IComponentModel>;
}
