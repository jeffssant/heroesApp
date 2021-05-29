import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Auth } from "../interfaces/auth.interface";
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;


  get auth(): Auth {
    return {...this._auth!};
  }

  constructor(private _http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {
    if(!localStorage.getItem('id')){
      return of(false);
    }

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
            .pipe(
              map( auth => {
                this._auth = auth;
                return true;
              })
            )
  }

  login() {
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
                      .pipe(
                        tap(resp => {
                          this._auth = resp;
                          localStorage.setItem('id', resp.id)
                        })
                      )
  }

  logout(){
    this._auth = undefined;
    localStorage.removeItem('id');
  }
}
