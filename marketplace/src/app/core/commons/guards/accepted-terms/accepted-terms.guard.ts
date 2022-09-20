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
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env, environment } from '../../../../../environments/environment';
import { TokenService } from '../../../infraestructure/driven-adapter/token.service';

@Injectable({
  providedIn: 'root',
})
export class AcceptedTermsGuard implements CanLoad, CanActivate {
  environment = env;

  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const acceptedTerms = this.acceptedTerms();
    return acceptedTerms;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const acceptedTerms = this.acceptedTerms();

    return acceptedTerms;
  }

  acceptedTerms() {
    const guards = environment.guards;
    const params = {
      idToken: this.tokenService.idToken,
    };
    if (guards.showInitialAcceptanceRequest.value) {
      // return this.authTermsConditionsUseCase.invoke(params).pipe(
      //   map((data) => {
      //     if (data == null) {
      //       this.router.navigate([TermsModalComponent.route]);
      //     }
      //     return data != null;
      //   })
      // );
      return true;
    } else {
      return of(true);
    }
  }
}
