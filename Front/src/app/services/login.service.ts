import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { User } from '../modeles/user';
import { JsonWebToken } from '../modeles/jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // permet de conserver le role pour l'utiliser dans les guards
  userRole: BehaviorSubject<string> = new BehaviorSubject('');

  isConnecte: Boolean = false;
  isLoggedin: Boolean = false;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { this.getUserRole(); }

  public get logged(): boolean {
    let exp: number;
    if (sessionStorage.getItem(environment.accessToken)) {
      console.log(sessionStorage.getItem(environment.accessToken));
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      exp = decodedToken.exp;
    }
    if ((sessionStorage.getItem(environment.accessToken) !== null) && (+new Date().getTime().toString().slice(0, 10) < exp)) {
      return true;
    } else {
      sessionStorage.removeItem(environment.accessToken);
      return false;
    }
  }

  signIn(user: User) {
    sessionStorage.removeItem(environment.accessToken);
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'users/signin', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);
        console.log(token.token);
        this.getUserRole();
        this.router.navigate(['/accueil']);
        this.isConnecte = true;
      },
      error => {
        // pop-up echec
        this.snackBar.open('Erreur de login', 'ECHEC', {
          duration: environment.durationSnackBar
        });
      });
  }

  signOut() {
    this.userRole.next('');
    sessionStorage.removeItem(environment.accessToken);
    this.router.navigate(['/accueil/logout']);
  }

  private getUserRole() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      console.log(decodedToken);
      const authority: string = decodedToken.auth.libelleFonction;
      console.log(authority);
      this.userRole.next(authority);
      console.log(this.userRole.value);
    }
  }
}
