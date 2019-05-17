import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Creneau } from '../modeles/creneau';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreneauxService {

  // La liste des Creneaux
  public availableCreneau: Creneau [];

  // La liste observable que l'on rend visible partout dans l'application
  availableCreneau$: BehaviorSubject<Creneau[]> = new BehaviorSubject(this.availableCreneau);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  public getCreneaux(): Observable<Creneau[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Creneau[]>('http://localhost:8080/creneaux/get/creneaux');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishCreneaux() {
    this.getCreneaux().subscribe(
      creneauList => {
        this.availableCreneau = creneauList;
        this.availableCreneau$.next(this.availableCreneau);
      });
  }

  /**
   * Cette fonction permet de trouver un creneau dans la liste des creneaux chargées par l'application
   * grâce à son ID.
   * @param idCreneau l'id qu'il faut rechercher dans la liste.
   */
  public findCreneau(idCreneau: number): Observable<Creneau> {
    if (idCreneau) {
      if (!this.availableCreneau) {
        return this.getCreneaux().pipe(map(creneaux => creneaux.find(creneau => creneau.idCreneau === idCreneau)));
      }
      return of(this.availableCreneau.find(creneau => creneau.idCreneau === idCreneau));
    } else {
      return of(new Creneau(0, '', null));
    }
  }

  /**
   * Fonction de création d'un nouveau creneau.
   * Elle met à jour notre liste de creneaux et notre liste observable.
   * @param newCreneau la nouvelle creneau à créer
   */
  public createCreneau(newCreneau: Creneau) {
    if (this.loginService.logged) {
      this.httpClient.post<Creneau>('http://localhost:8080/creneaux/create', newCreneau).subscribe(
        createCreneau => {
          this.availableCreneau.push(createCreneau);
          this.availableCreneau$.next(this.availableCreneau);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de mise à jour d'une creneau
   * @param creneau la creneau à mettre à jour
   */
  public updateCreneau(creneau: Creneau) {
    if (this.loginService.logged) {
      this.httpClient.put<Creneau>(`http://localhost:8080/creneaux/update/${creneau.idCreneau}`, creneau).subscribe(
        updateCreneau => {
          this.availableCreneau.splice(this.availableCreneau.indexOf(creneau), 1, updateCreneau);
          this.availableCreneau$.next(this.availableCreneau);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de suppression d'un Creneau.
   * Elle met à jour notre liste de Creneaux et notre liste observable.
   * @param idCreneau de le Creneau à supprimer
   */
  supprimerCreneau(idCreneau: number): Creneau[] {
    if (this.loginService.logged) {
      this.httpClient.delete('http://localhost:8080/creneaux/delete/' + idCreneau).subscribe(
            () => { console.log('suppression créneau OK : ', idCreneau);
                    this.availableCreneau.splice(this.availableCreneau.indexOf(this.availableCreneau.find(equipe => equipe.idCreneau === idCreneau), 1));
                    this.availableCreneau$.next(this.availableCreneau);
                },
            (error) => console.log('suppression créneau pb : ', error)
        );
      return this.availableCreneau;
    } else {
      this.router.navigate(['connexion']);
    }
  }
}
