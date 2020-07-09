import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  /* A guard to ensure an external redirect using angular router
  https://stackoverflow.com/a/51059505/4385116 */

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    window.location.href = route.data['externalUrl'];
    return true;
  }

}
