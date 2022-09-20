import {Observable} from 'rxjs';
import { IImplementationModel } from '../implementation.model';

export abstract class ImplementationGateway {
  abstract getByTechnologyVersionAndId(params): Observable<IImplementationModel>;
  abstract getLatestTechnologyByIdComponent(idComponent: string): Observable<IImplementationModel[]>;
  abstract getVersionsComponent(id: string): Observable<{ [index: string]: string[] }>;
  abstract uploadImplementationComponent(impl: IImplementationModel): Observable<any>;

}