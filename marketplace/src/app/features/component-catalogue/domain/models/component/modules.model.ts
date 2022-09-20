import {IModulesChildrenModel} from './children-modules.model';
export interface IModulesModel {
  name: string;
  children: Array<IModulesChildrenModel>;
}
