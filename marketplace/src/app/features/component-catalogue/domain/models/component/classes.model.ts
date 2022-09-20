import {IMethodsClassesModel} from './methods-classes.model';
export interface IClassesModel {
  name: string;
  extends: string;
  methods: Array<IMethodsClassesModel>;
}
