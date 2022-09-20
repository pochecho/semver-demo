import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from 'src/app/core/infraestructure/driven-adapter/token.service';
import { API_URL_COMPONENT_CATALOGUE } from '../../../../../core/infraestructure/constants/microservices.constants';
import { BcGenericResponseModel } from '../../../../../core/infraestructure/driven-adapter/response-model';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { ComponentGateway } from '../../../domain/models/component/gateway/component.gateway';
import { IUploadComponentModel } from '../../../domain/models/component/upload-component.model';

const defaultSuccessMapper = (x) => {
  if (x.code.code === 200) {
    return x.data;
  }
  return null;
};
const defaultCatchError = (err) => {
  return of(null);
};
@Injectable()
export class ComponentService extends ComponentGateway {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Origin, Authorization, X-API-KEY, Origin, X-Requested-With,' +
        'Content-Type, Accept, Access-Control-Allow-Request-Method',
      idToken: this.tokenService.idToken,
    }),
  };
  uploadImage(file: any, name): Observable<string> {
    const url = `${API_URL_COMPONENT_CATALOGUE}/image/upload`;
    const reader = new FileReader();
    let base64image;
    const callResponse = new Observable<string>((observer) => {
      reader.onload = () => {
        base64image = reader.result;
        this.http
          .post<BcGenericResponseModel<any>>(url, { image: base64image, nameImage: name }, this.httpOptions)
          .pipe(
            map((response) => {
              if (response.code.code === 200) {
                return response.data.Location;
              }
              return null;
            })
          )
          .subscribe((location) => {
            observer.next(location);
            observer.complete();
          });
      };
      reader.readAsDataURL(file);
    });
    return callResponse;
  }
  uploadComponent(component: IUploadComponentModel): Observable<IUploadComponentModel> {
    const url = `${API_URL_COMPONENT_CATALOGUE}/components/register`;
    return this.http
      .post<BcGenericResponseModel<any>>(url, component, this.httpOptions)
      .pipe(map(defaultSuccessMapper));
  }

  updateComponent(component: IComponentModel): Observable<IComponentModel> {
    const data: any = {
      ...component,
    };

    data.implementations = Object.values(component.implementations);

    return this.http
      .put<BcGenericResponseModel<any>>(
        `${API_URL_COMPONENT_CATALOGUE}/components/${component.id}`,
        data,
        this.httpOptions
      )
      .pipe(map(defaultSuccessMapper), catchError(defaultCatchError));
  }
  constructor(private http: HttpClient, private tokenService: TokenService) {
    super();
  }

  getVersionsComponent(id: string): Observable<{ [index: string]: string[] }> {
    throw new Error('Method not implemented.');
  }

  getAll(): Observable<IComponentModel[]> {
    return this.http
      .get<BcGenericResponseModel<IComponentModel[]>>(
        `${API_URL_COMPONENT_CATALOGUE}/components/overview/summary`,
        this.httpOptions
      )
      .pipe(map(defaultSuccessMapper), catchError(defaultCatchError));
  }

  getComponentById(id: string): Observable<IComponentModel> {
    return this.http
      .get<BcGenericResponseModel<IComponentModel[]>>(
        `${API_URL_COMPONENT_CATALOGUE}/components/${id}`,
        this.httpOptions
      )
      .pipe(map(defaultSuccessMapper), catchError(defaultCatchError));
  }
}
