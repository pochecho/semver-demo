import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment as env } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TermsGuard implements CanActivate {
  environment = env;

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!this.environment.production) {
      this.router.navigate(['home']);
    }
    return this.environment.production;
  }
}
