import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router,) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;

    newHeaders = newHeaders.set('Content-Type', 'application/json');

    newHeaders = newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders = newHeaders.set(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    newHeaders = newHeaders.set('idToken', this.tokenService.idToken);

    const newReq = req.clone({ headers: newHeaders });

    return next.handle(newReq).pipe(
      catchError((error) => {
        if (error.status === 403) {
          // this.authService.loginRedirect();
        }
        return of(error);
      })
    );
  }
}
