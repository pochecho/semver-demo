import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment as env } from '../../../../../environments/environment';
import { AcceptedTermsGuard } from '../accepted-terms/accepted-terms.guard';
import { HomeModule } from '../../../../features/home/home.module';

@Injectable({
  providedIn: 'root',
})
export class NotAcceptedTermsGuard implements CanLoad, CanActivate {
  environment = env;

  constructor(private router: Router, private acceptedTermsGuard: AcceptedTermsGuard) {}

  generalValidation(observable) {
    return observable.pipe(
      map((response) => {
        return !response;
      }),
      tap((response) => {
        if (!response) {
          this.router.navigate([HomeModule.route]);
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.generalValidation(this.acceptedTermsGuard.canActivate(route, state) as Observable<boolean>);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.generalValidation(this.acceptedTermsGuard.canLoad(route, segments) as Observable<boolean>);
  }
}
