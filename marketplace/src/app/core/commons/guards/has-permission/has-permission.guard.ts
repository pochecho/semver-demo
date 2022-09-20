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
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { environment } from 'src/environments/environment';
import { isPossibleToPerform } from '../../helpers/permission/permission.helpers';

@Injectable({
  providedIn: 'root',
})
/**
 * Este guard se encarga de verificar si el usuario tiene permiso o no a algun modulo completo.
 */
export class HasPermissionGuard implements CanLoad {
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const guards = environment.guards;
    if (guards.enableRoleAndPermissions.value) {
      const identifier = route.data['identifier'];
      const isAllowed = isPossibleToPerform(identifier, USER_PERMISSIONS_DATA['flat-permissions']);
      if (!isAllowed) {
        this.router.navigate(['not-allowed']);
      }
      return isAllowed;
    }
    return true;
  }
}
