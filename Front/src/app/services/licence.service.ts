import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { LoginService } from './login.service';

import { Licence } from '../modeles/licence';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

   // La liste des licences
   public availableLicence: Licence [];

   // La liste observable que l'on rend visible partout dans l'application
   availableLicence$: BehaviorSubject<Licence[]> = new BehaviorSubject(this.availableLicence);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  public getLicence(): Observable<Licence[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Licence[]>('http://localhost:8080/licences/get/licences');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishLicence() {
    this.getLicence().subscribe(
      licenceList => {
        this.availableLicence = licenceList;
        this.availableLicence$.next(this.availableLicence);
      });
  }
}
