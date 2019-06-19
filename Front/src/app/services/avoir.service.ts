import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { LoginService } from './login.service';

import { Avoir } from '../modeles/avoir';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {

  // La liste des avoir
  public availableAvoir: Avoir [];

  // La liste observable que l'on rend visible partout dans l'application
  availableAvoir$: BehaviorSubject<Avoir[]> = new BehaviorSubject(this.availableAvoir);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

   public getAvoir(): Observable<Avoir[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Avoir[]>('http://localhost:5000/avoir/get/avoir');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishAvoir() {
    this.getAvoir().subscribe(
      avoirList => {
        this.availableAvoir = avoirList;
        this.availableAvoir$.next(this.availableAvoir);
      });
  }

}
