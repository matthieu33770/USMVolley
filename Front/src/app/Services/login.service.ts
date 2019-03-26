import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {JsonWebToken} from '../model/jwt';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // permet de conserver le role pour l'utiliser dans les guards
  userRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  isConnecte: Boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private location: Location) {
    this.getUserRoles();
  }

  public get loggedIn(): boolean {
    if (sessionStorage.getItem(environment.accessToken) !== null) {
      return this.isConnecte = true;
    }
  }

  public get logged(): boolean {
    return sessionStorage.getItem(environment.accessToken) !== null;
  }

  signIn(user: User) {
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'signin', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);
        console.log(token.token);
        console.log(environment.accessToken);
        this.getUserRoles();

        this.router.navigate(['/agenda']);
        this.router.navigate(['/accueil']);

        this.isConnecte = true;
      },
      error => console.log('Error while login'));
  }

  signOut() {
    sessionStorage.removeItem(environment.accessToken);
    this.router.navigate(['/agenda']);
    this.router.navigate(['/accueil/logout']);
  }

  private getUserRoles() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      console.log(decodedToken);
      const authorities: Array<any> = decodedToken.auth;
      this.userRoles.next(authorities.map(authority => authority.authority));
    }
  }
}
