import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  login(username: string, mdp: string) {
    if (this.loginService.logged) {
      return this.httpClient.post<{access_token: string}>('http://localhost:8080/joueurs/get', {username, mdp}).pipe(tap(res => {
        localStorage.setItem('access_token', res.access_token);
      }));
    } else {
      this.router.navigate(['connexion']);
    }
  }

  register(username: string, mdp: string) {
    if (this.loginService.logged) {
      return this.httpClient.post<{access_token: string}>('http://localhost:8080/joueurs/get', {username, mdp}).pipe(tap(res => {
        this.login(username, mdp);
      }));
    } else {
      this.router.navigate(['connexion']);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
