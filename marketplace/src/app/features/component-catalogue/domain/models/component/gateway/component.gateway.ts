import { Observable } from 'rxjs';
import { IComponentModel } from '../component.model';
import { IUploadComponentModel } from '../upload-component.model';

export abstract class ComponentGateway {
  abstract getAll(): Observable<IComponentModel[]>;
  abstract updateComponent(component: IComponentModel) : Observable<IComponentModel>;
  abstract uploadComponent(component: IUploadComponentModel) : Observable<IUploadComponentModel>;
  abstract uploadImage(file:File, name:string) :Observable<string>;
  abstract getComponentById(id: string): Observable<IComponentModel>;
}
