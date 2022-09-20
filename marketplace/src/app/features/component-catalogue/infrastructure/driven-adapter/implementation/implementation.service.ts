import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { BcGenericResponseModel } from '../../../../../core/infraestructure/driven-adapter/response-model';
import { catchError, map } from 'rxjs/operators';
import { ImplementationGateway } from '../../../domain/models/implementation/gateway/implementation.gateway';
import { API_URL_COMPONENT_CATALOGUE } from 'src/app/core/infraestructure/constants/microservices.constants';
import { IImplementationModel } from '../../../domain/models/implementation/implementation.model';
import { TokenService } from 'src/app/core/infraestructure/driven-adapter/token.service';

const defaultSuccessMapper = (response) => {
  if (response.code.code === 200) {
    return response.data;
  }
  return null;
};

@Injectable({
  providedIn: 'root',
})
export class ImplementationService extends ImplementationGateway {
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
  uploadImplementationComponent(impl: IImplementationModel): Observable<any> {
    const url = `${API_URL_COMPONENT_CATALOGUE}/implementations`;
    return this.http.post<BcGenericResponseModel<any>>(url, impl, this.httpOptions).pipe(
      map(defaultSuccessMapper),
      catchError((err) => {
        return of(null);
      })
    );
  }
  constructor(private http: HttpClient, private tokenService: TokenService) {
    super();
  }

  getLatestTechnologyByIdComponent(idComponent: string): Observable<IImplementationModel[]> {
    return this.http
      .get<BcGenericResponseModel<IComponentModel[]>>(
        `${API_URL_COMPONENT_CATALOGUE}/implementations/${idComponent}`,
        this.httpOptions
      )
      .pipe(
        map(defaultSuccessMapper),
        catchError((err) => {
          return of(null);
        })
      );
  }

  getByTechnologyVersionAndId(params): Observable<IImplementationModel> {
    const route = `${API_URL_COMPONENT_CATALOGUE}/implementations/technology/version?technology=${params.technology}&version=${params.version}&idComponent=${params.id}`;
    return this.http.get<BcGenericResponseModel<IImplementationModel>>(route, this.httpOptions).pipe(
      map((response) => {
        if (response.code.code === 200) {
          return response.data[0];
        }
        return null;
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  getVersionsComponent(id: string): Observable<{ [index: string]: string[] }> {
    return this.http
      .get<BcGenericResponseModel<IComponentModel[]>>(
        `${API_URL_COMPONENT_CATALOGUE}/implementations/versions/${id}`,
        this.httpOptions
      )
      .pipe(
        map(defaultSuccessMapper),
        catchError((err) => {
          return of(null);
        })
      );
  }
}
