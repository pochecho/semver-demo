import { IMethodsClassesModel } from './methods-classes.model';

export interface IInjectablesModel {
  name: string;
  methods: Array<IMethodsClassesModel>;
  properties?: Array<any>;
  extends?: string;
}
