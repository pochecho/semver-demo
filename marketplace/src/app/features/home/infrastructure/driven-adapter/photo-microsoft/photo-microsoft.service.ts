import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { API_MICROSOFT } from '../../../../../core/infraestructure/constants/microservices.constants';
import {IPhotoMicrosoftGateway} from '../../../domain/models/photo-microsoft/gateway/photo-microsoft.gateway';

@Injectable({
  providedIn: 'root'
})

export class PhotoMicrosoftService extends IPhotoMicrosoftGateway {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    super();
  }

  getPhotoMicrosoft(): Observable<any> {
    const httpOptions = new HttpHeaders({
      'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlRidXNjTkFlMjlIeHJWTnlUbkFGSzFYZ2Z4b2hEM254blN4MC1Hc1FJYzgiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iNWUyNDRiZC1jNDkyLTQ5NWItOGIxMC02MWJmZDQ1M2U0MjMvIiwiaWF0IjoxNjI1Njc1MzYzLCJuYmYiOjE2MjU2NzUzNjMsImV4cCI6MTYyNTY3OTI2MywiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiQVVRQXUvOFRBQUFBRTJaMVFqN3JTc25uUFg1OHEweUNQWUh4Vy81d203QW5GMVdDYk9CN0tCVlFQaGRkaXRuVkZkME4zK0M2ZzlHT1FwSjdzbGduWGE2MmRnYk1SRDAydkE9PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIgKG9mZmljaWFsIHNpdGUpIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJjb250cm9scyI6WyJhcHBfcmVzIl0sImNvbnRyb2xzX2F1ZHMiOlsiMDAwMDAwMDMtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwIl0sImZhbWlseV9uYW1lIjoiTW95YSBDYXJyZXJvIiwiZ2l2ZW5fbmFtZSI6IkpvbmF0aGFuIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTkwLjI2LjQwLjI0MyIsIm5hbWUiOiJKb25hdGhhbiBNb3lhIENhcnJlcm8iLCJvaWQiOiI3ODNhYTI1MS01YzU2LTQ2NGItYjljNi1mYmEzYWU0NWZjYzciLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzY4MDk5MzU4OS01OTcxNTcwMjEtNDEyNDY0MjcwNC0xMTQ0ODk1IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxMjAwNDlDN0IiLCJyaCI6IjAuQVE4QXZVVGl0WkxFVzBtTEVHR18xRlBrSTdYSWk5NzUyYkZJcUsyM1NOcHlVR1FQQU9ZLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ29udGFjdHMuUmVhZFdyaXRlIERldmljZU1hbmFnZW1lbnRBcHBzLlJlYWQuQWxsIERldmljZU1hbmFnZW1lbnRBcHBzLlJlYWRXcml0ZS5BbGwgRGV2aWNlTWFuYWdlbWVudENvbmZpZ3VyYXRpb24uUmVhZC5BbGwgRGV2aWNlTWFuYWdlbWVudENvbmZpZ3VyYXRpb24uUmVhZFdyaXRlLkFsbCBEZXZpY2VNYW5hZ2VtZW50TWFuYWdlZERldmljZXMuUHJpdmlsZWdlZE9wZXJhdGlvbnMuQWxsIERldmljZU1hbmFnZW1lbnRNYW5hZ2VkRGV2aWNlcy5SZWFkLkFsbCBEZXZpY2VNYW5hZ2VtZW50TWFuYWdlZERldmljZXMuUmVhZFdyaXRlLkFsbCBEZXZpY2VNYW5hZ2VtZW50UkJBQy5SZWFkLkFsbCBEZXZpY2VNYW5hZ2VtZW50UkJBQy5SZWFkV3JpdGUuQWxsIERldmljZU1hbmFnZW1lbnRTZXJ2aWNlQ29uZmlnLlJlYWQuQWxsIERldmljZU1hbmFnZW1lbnRTZXJ2aWNlQ29uZmlnLlJlYWRXcml0ZS5BbGwgRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgRGlyZWN0b3J5LlJlYWRXcml0ZS5BbGwgRmlsZXMuUmVhZFdyaXRlLkFsbCBHcm91cC5SZWFkV3JpdGUuQWxsIElkZW50aXR5Umlza0V2ZW50LlJlYWQuQWxsIE1haWwuUmVhZFdyaXRlIE1haWxib3hTZXR0aW5ncy5SZWFkV3JpdGUgTm90ZXMuUmVhZFdyaXRlLkFsbCBvcGVuaWQgUGVvcGxlLlJlYWQgcHJvZmlsZSBSZXBvcnRzLlJlYWQuQWxsIFNpdGVzLlJlYWRXcml0ZS5BbGwgVGFza3MuUmVhZFdyaXRlIFVzZXIuUmVhZCBVc2VyLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkV3JpdGUgVXNlci5SZWFkV3JpdGUuQWxsIGVtYWlsIiwic3ViIjoicFY4NUlYYk1aQzJOdEZFamVmb0pLN3E0MmZhRVBGb1BTVGtsSC1UR0hkbyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJTQSIsInRpZCI6ImI1ZTI0NGJkLWM0OTItNDk1Yi04YjEwLTYxYmZkNDUzZTQyMyIsInVuaXF1ZV9uYW1lIjoiam9ubW95QGJhbmNvbG9tYmlhLmNvbS5jbyIsInVwbiI6Impvbm1veUBiYW5jb2xvbWJpYS5jb20uY28iLCJ1dGkiOiJDOVVpQ0gwUjFVeUdoOEsyamxVNkFnIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6IkV1SHpWbWVBWjFrd3N4S0RZTllUYnh5NHNrUExmYnNtZEFCYW1xR0d0ckkifSwieG1zX3RjZHQiOjE0MjA1NTc2ODF9.PNltTD_Ah7B8qeaDKk-jcHhxQJbNnx_m7uMsa8H-dBRdPAjAUz1C1eY1dZa1pwRCEXiNks69P29GWu_b5aae3UBRSGAyS6bAJ1mahaGLTcMnHJijviOEp6BnpamHqXE4NVXxzAFch5jd4DoVvcPjlnSB4jvcOqeTfqnOPVgV9TGSS-h55nRcH2mwpjY7dhwVB4ce-Bknx9zF_vS-Pbdjz25bddEmjyS_rx6zHHAymjGJed-zl9TdemXQG3w6PtzVtwQmhG8TXOSgX8MylAEZvAKgZ-yeXAJQXhxgMxM2WQj1bTdSazDXd2IQkAkv8QIje5AMEPzjTfpoJ5IUbi-ACA",
      'Content-Type': 'image/jpg'
    });
    return this.httpClient
      .get(
        `${API_MICROSOFT}/me/photo/$value`, {
          headers: httpOptions,
          responseType: 'blob' as 'json',
        })
      .pipe(
        map((photo: any) => {
          if (photo) {
            return photo;
          }
          return null;
        })
      )
      .pipe(
        catchError(() => {
          return of(null);
        })
      );
  }
}
