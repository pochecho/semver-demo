import {IMethodClassModel} from './method-class.model';
import {IOutputClassModel} from './output-class.model';
import {IInputClassModel} from './input-class.model';
export interface ICompodocComponentModel {
  methodClass: Array<IMethodClassModel>;
  outputsClass: Array<IOutputClassModel>;
  rawdescription: string;
  inputsClass: Array<IInputClassModel>;
  name: string;
  selector: string;
  styles?: Array<any>;
}
