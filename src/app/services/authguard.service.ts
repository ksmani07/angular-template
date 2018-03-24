import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './login.service';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected router: Router, protected authService: LoginService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (state.url !== '/login' && !this.authService.islogedAccount()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
