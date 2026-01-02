import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
import { NotificationBoxService } from 'src/app/shared/services/notification-box/notification-box.service';
import { NotificationTypes } from '../models/notification-box.interface';

@Injectable()
export class CanLoadLoggedUserGuard  {
  constructor(private readonly _jwtHelper: JwtHelperService,
              private readonly _authService: AuthService,
              private readonly _router: Router){ }

  canLoad(route: Route, segments: UrlSegment[]):Observable<boolean> | Promise<boolean> | boolean {
    const token = this._authService.getAccessToken();

    if(token && !this._jwtHelper.isTokenExpired(token)) {
      return true;
    }

    if(token && this._jwtHelper.isTokenExpired(token)) {
      const refreshToken = this._authService.getCookie("refresh_Token");
      return this._authService.refreshTokenAndCheckAccess(token, refreshToken!);
    }

    this._router.navigate(["login"]);
    return false;
  }

}
