import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment.local";

@Injectable()
export class BaseService {
  constructor(protected _http: HttpClient) { }

  protected getResource<R>(resource: string): Observable<R> {
    return this._http.get<R>(`${environment.apiBaseUrl}/${resource}`);
  }

  protected post<T, R>(resource: string, body: T): Observable<R> {
    return this._http.post<R>(`${environment.apiBaseUrl}/${resource}`, body);
  }

  protected postWithHeaders<T, R>(resource: string, body: T, headers): Observable<R> {
    return this._http.post<R>(`${environment.apiBaseUrl}/${resource}`, body, {
      headers: headers
    });
  }
}
