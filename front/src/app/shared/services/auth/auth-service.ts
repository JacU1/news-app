import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EMPTY, Observable, catchError, lastValueFrom, map, of, tap } from 'rxjs';
import { NotificationBoxService } from '../notification-box/notification-box.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUserAuthResponse } from '../../../core/models/user-auth-response';
import { BASE_API } from '../../../core/config/constants';
import { NotificationTypes } from '../../../core/models/notification-box.interface';

@Injectable()
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _notificationService = inject(NotificationBoxService);
  private readonly _router = inject(Router);
  private readonly _cookieService = inject(CookieService);

  public loginUser(loginForm: FormGroup): Observable<IUserAuthResponse> {
    const loginBody = {
      email: loginForm.get("loginName")?.value,
      password: loginForm.get("password")?.value
    };

    return this._http.post<IUserAuthResponse>(`${BASE_API}/api/Auth/login`, loginBody, {withCredentials: true})
      .pipe(tap((auth => {
        this.setAccessToken(auth.token);
        this.setRefreshToken(auth.refreshToken);
        localStorage.setItem("access_token", auth.token);
      })),catchError(err => {
        const errMessage = err.error.errors ? err.error.errors.Email[0] : err.error.errorMessage;
        this._notificationService.showNotificationBox(NotificationTypes.DANGER, errMessage ? errMessage : "Login error");
        return EMPTY;
      }));
  }

  public refreshToken(token: string | null, refreshToken: string| null): Observable<IUserAuthResponse> {
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    const headers = new HttpHeaders()
    .set('content-type', 'application/json');

    return this._http.post<IUserAuthResponse>(`${BASE_API}/api/Token/refresh`,credentials, {headers}).pipe(
      catchError(err => {
        console.log(err);
        this._router.navigate(["/login"]);
        this._notificationService.showNotificationBox(NotificationTypes.DANGER, "Error during token refreshing" + err.message);
        return EMPTY;
      })
    );
  }

  public refreshTokenAndCheckAccess(token: string, refreshToken: string): Observable<boolean> {
    return this.refreshToken(token, refreshToken).pipe(
      map(newTokens => {
        console.log(newTokens);
        this._cookieService.deleteAll('/app', 'localhost');
        this.setAccessToken(newTokens.token);
        this.setRefreshToken(newTokens.refreshToken);
        return true;
      }),
      catchError(error => {
        console.log(error);
        this._notificationService.showNotificationBox(NotificationTypes.DANGER, "Error during token refreshing" + error);
        this.removeAllCookies();
        this._router.navigate(["/login"]);
        return of(false);
      })
    );
  }

  public logoutUser() : void {
    this._notificationService.showNotificationBox(NotificationTypes.INFO, "User logged out.");
    this.removeAllCookies();
    this._router.navigate(["login"]);
  }

  public registerUser(form: FormGroup): Observable<any> {
    const formValue = form.getRawValue();
    const body = {
      name: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      userTag: formValue.userTag,
      password: formValue.passwordFormGroup.password
    }

    return this._http.post<any>(`${BASE_API}/api/User/register`,body, {withCredentials: true}).pipe(
      catchError(err => {
        this._notificationService.showNotificationBox(NotificationTypes.DANGER, err.message);
        return EMPTY;
      })
    );
  }

  setAccessToken(token: string): void {
    this._cookieService.set('access_token', token);
  }

  setRefreshToken(token: string): void {
    this._cookieService.set('refresh_Token', token);
  }

  getCookie(name: string): string {
    return this._cookieService.get(name);
  }

  getAccessToken(): string {
    return this._cookieService.get('access_token');
  }

  removeAccessToken(): void {
    this._cookieService.delete('access_token');
  }

  removeRefreshAccessToken(): void {
    this._cookieService.delete('refresh_Token');
  }

  removeAllCookies(): void {
    this._cookieService.deleteAll('/', 'localhost');
  }
}
