import { inject, Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth-service';

@Injectable()
export class CanLoadLoggedUserGuard  {
  #authService = inject(AuthService);
  #jwtHelper = inject(JwtHelperService);
  #router = inject(Router);

  canLoad(route: Route, segments: UrlSegment[]):Observable<boolean> | Promise<boolean> | boolean {
    const token = this.#authService.getAccessToken();

    if(token && !this.#jwtHelper.isTokenExpired(token)) {
      return true;
    }

    if(token && this.#jwtHelper.isTokenExpired(token)) {
      return this.#authService.refreshTokenAndCheckAccess(token, this.#authService.getCookie("refresh_Token")!);
    }

    this.#router.navigate(["login"]);
    return false;
  }

}
