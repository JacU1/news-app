import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { BASE_API } from '../../../core/config/constants';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private readonly _http: HttpClient, private readonly _auth: AuthService) { }

  public GetandSetToken() {
    const headers = this._auth.csrfTokenRequestHandler();
    return this._http.post(`${BASE_API}/api/Ping/Startupcall`, null, {withCredentials: true, headers}).pipe(
      switchMap(_ => this._http.get(`${BASE_API}/api/Ping/antiforgerytoken`, {withCredentials: true, headers}))
    );
  }

  public testCsrf() {
    const headers = this._auth.csrfTokenRequestHandler();
    return this._http.post(`${BASE_API}/api/Ping/csrftest`, null ,{ withCredentials: true, headers });
  }
}
