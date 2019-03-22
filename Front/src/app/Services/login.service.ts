import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {JsonWebToken} from '../model/jwt';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // permet de conserver le role pour l'utiliser dans les guards
  userRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  isConnecte: boolean;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getUserRoles();
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem(environment.accessToken) !== null;
  }

  signIn(user: User) {
    console.log(user);
    console.log(environment.apiUrl + 'sign-in');
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'sign-in', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);

        this.getUserRoles();

        this.router.navigate(['']);

        this.isConnecte = true;
      },
      error => console.log('Error while login'));
  }

  signOut() {
    sessionStorage.removeItem(environment.accessToken);
  }

  private getUserRoles() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      const authorities: Array<any> = decodedToken.auth;
      this.userRoles.next(authorities.map(authority => authority.authority));
    }
  }
}
