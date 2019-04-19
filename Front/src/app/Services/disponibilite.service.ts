import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Disponibilite } from '../Model/Disponibilite';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {

  // La liste des disponibilités
  public availableDisponibilite: Disponibilite [];

  // La liste observable que l'on rend visible partout dans l'application
  availableDisponibilite$: BehaviorSubject<Disponibilite[]> = new BehaviorSubject(this.availableDisponibilite);

  constructor(private httpClient: HttpClient) { }

  public getDisponibilites(): Observable<Disponibilite[]> {
    return this.httpClient.get<Disponibilite[]>('http://localhost:8080/disponibilite/get/disponibilites');
  }

  public publishDisponibilites() {
    this.getDisponibilites().subscribe(
      disponibiliteList => {
        this.availableDisponibilite = disponibiliteList;
        this.availableDisponibilite$.next(this.availableDisponibilite);
      });
  }

  /**
   * Cette fonction permet de trouver une disponibilite dans la liste des disponibilites chargées par l'application
   * grâce à son ID.
   * @param idDisponibilite l'id qu'il faut rechercher dans la liste.
   */
  public findDisponibilite(idDisponibilite: number): Observable<Disponibilite> {
    if (idDisponibilite) {
      if (!this.availableDisponibilite) {
        return this.getDisponibilites().pipe(map(disponibilites => disponibilites.find(disponibilite => disponibilite.idDisponibilite === idDisponibilite)));
      }
      return of(this.availableDisponibilite.find(disponibilite => disponibilite.idDisponibilite === idDisponibilite));
    } else {
      return of(new Disponibilite(0, '', 0));
    }
  }

  /**
   * Fonction de création d'une nouvelle disponibilite.
   * Elle met à jour notre liste de disponibilites et notre liste observable.
   * @param newDisponibilite la nouvelle disponibilite à créer
   */
  public createDisponibilite(newDisponibilite: Disponibilite) {
    this.httpClient.post<Disponibilite>('http://localhost:8080/disponibilite/create', newDisponibilite).subscribe(
      createDisponibilite => {
        this.availableDisponibilite.push(createDisponibilite);
        this.availableDisponibilite$.next(this.availableDisponibilite);
      }
    );
  }


  /**
   * Fonction de mise à jour d'une disponibilite
   * @param disponibilite la disponibilite à mettre à jour
   */
  public updateDisponibilite(disponibilite: Disponibilite) {
    this.httpClient.put<Disponibilite>(`http://localhost:8080/disponibilite/update/${disponibilite.idDisponibilite}`, disponibilite).subscribe(
      updateDisponibilite => {
        this.availableDisponibilite$.next(this.availableDisponibilite);
      }
    );
  }

  /**
   * Fonction de suppression d'une disponibilite.
   * Elle met à jour notre liste de disponibilites et notre liste observable.
   * @param idDisponibilite de la disponibilite à supprimer
   */
  supprimerDisponibilite(idDisponibilite: number): Disponibilite[] {
    this.httpClient.delete('http://localhost:8080/disponibilite/delete/' + idDisponibilite).subscribe(
          () => { console.log('suppression disponibilité OK : ', idDisponibilite);
              },
          (error) => console.log('suppression disponibilité pb : ', error)
      );
    this.availableDisponibilite = this.availableDisponibilite.filter( disponibilite => disponibilite.idDisponibilite !== idDisponibilite ).slice();
    this.availableDisponibilite$.next(this.availableDisponibilite);
    return this.availableDisponibilite;
  }
}
