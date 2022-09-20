import { IImplementationModel } from '../implementation/implementation.model';
export interface IComponentModel {
  implementations: { [index: string]: IImplementationModel };
  image: any;
  id: string;
  nameComponent: string;
  tags: Array<any>;
  status: string;
}
