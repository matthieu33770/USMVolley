import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Creneau } from '../Model/Creneau';

@Injectable({
  providedIn: 'root'
})
export class CreneauxService {

  // La liste des Creneaux
  public availableCreneau: Creneau [];

  // La liste observable que l'on rend visible partout dans l'application
  availableCreneau$: BehaviorSubject<Creneau[]> = new BehaviorSubject(this.availableCreneau);

  constructor(private httpClient: HttpClient) { }

  public getCreneaux(): Observable<Creneau[]> {
    return this.httpClient.get<Creneau[]>('http://localhost:8080/creneaux/get/creneaux');
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
    this.httpClient.post<Creneau>('http://localhost:8080/creneaux/create', newCreneau).subscribe(
      createCreneau => {
        this.availableCreneau.push(createCreneau);
        this.availableCreneau$.next(this.availableCreneau);
      }
    );
  }

  /**
   * Fonction de mise à jour d'une creneau
   * @param creneau la creneau à mettre à jour
   */
  public updateCreneau(creneau: Creneau) {
    this.httpClient.put<Creneau>(`http://localhost:8080/lieux/update/${creneau.idCreneau}`, creneau).subscribe(
      updateCreneau => {
        this.availableCreneau$.next(this.availableCreneau);
      }
    );
  }

  /**
   * Fonction de suppression d'un Creneau.
   * Elle met à jour notre liste de Creneaux et notre liste observable.
   * @param idCreneau de le Creneau à supprimer
   */
  supprimerCreneau(idCreneau: number): Creneau[] {
    this.availableCreneau = this.availableCreneau.filter( creneau => creneau.idCreneau !== idCreneau ).slice();
    return this.availableCreneau;
  }
}
