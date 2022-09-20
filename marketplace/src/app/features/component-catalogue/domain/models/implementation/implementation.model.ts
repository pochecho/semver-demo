import { ICompodocComponentModel } from '../component/compodoc-component.model';
import { IModulesModel } from '../component/modules.model';
import { IClassesModel } from '../component/classes.model';
import { IInjectablesModel } from '../component/injectables.model';

export interface IImplementationModel {
  components?: ICompodocComponentModel[];
  modules?: IModulesModel[];
  classes?: IClassesModel[];
  injectables?: IInjectablesModel[];
  routes?: Array<any>;
  interfaces?: Array<any>;
  miscellaneous?: Array<any>;
  directives?: Array<any>;
  pipes?: Array<any>;
  technology: string;
  import?: string;
  path?: any;
  [index:string] : any 
}
