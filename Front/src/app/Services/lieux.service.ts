import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Lieu } from '../Model/Lieu';

@Injectable({
  providedIn: 'root'
})
export class LieuxService {

  // La liste des lieux
  public availableLieu: Lieu [];

  // La liste observable que l'on rend visible partout dans l'application
  availableLieu$: BehaviorSubject<Lieu[]> = new BehaviorSubject(this.availableLieu);

  constructor(private httpClient: HttpClient) { }

  public getLieux(): Observable<Lieu[]> {
    return this.httpClient.get<Lieu[]>('http://localhost:8080/lieux/get/lieux');
  }

  public publishLieux() {
    this.getLieux().subscribe(
      lieuList => {
        this.availableLieu = lieuList;
        this.availableLieu$.next(this.availableLieu);
      });
  }

  /**
   * Cette fonction permet de trouver un lieu dans la liste des lieux chargées par l'application
   * grâce à son ID.
   * @param idLieu l'id qu'il faut rechercher dans la liste.
   */
  public findLieu(idLieu: number): Observable<Lieu> {
    if (idLieu) {
      if (!this.availableLieu) {
        return this.getLieux().pipe(map(lieux => lieux.find(lieu => lieu.idLieu === idLieu)));
      }
      return of(this.availableLieu.find(lieu => lieu.idLieu === idLieu));
    } else {
      return of(new Lieu(0, ''));
    }
  }

  /**
   * Fonction de création d'un nouveau lieu.
   * Elle met à jour notre liste de lieux et notre liste observable.
   * @param newLieu le nouveau lieu à créer
   */
  public createLieu(newLieu: Lieu) {
    this.httpClient.post<Lieu>('http://localhost:8080/lieux/create', newLieu).subscribe(
      createLieu => {
        this.availableLieu.push(createLieu);
        this.availableLieu$.next(this.availableLieu);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un lieu
   * @param lieu le lieu à mettre à jour
   */
  public updateLieu(lieu: Lieu) {
    this.httpClient.put<Lieu>(`http://localhost:8080/lieux/update/${lieu.idLieu}`, lieu).subscribe(
      updateLieu => {
        this.availableLieu$.next(this.availableLieu);
      }
    );
  }

  /**
   * Fonction de suppression d'un lieu.
   * Elle met à jour notre liste de lieux et notre liste observable.
   * @param idLieu du lieu à supprimer
   */
  supprimerLieu(idLieu: number): Lieu[] {
    this.httpClient.delete('http://localhost:8080/lieux/delete/' + idLieu).subscribe(
          () => { console.log('suppression lieu OK : ', idLieu);
              },
          (error) => console.log('suppression lieu pb : ', error)
      );
    this.availableLieu = this.availableLieu.filter( lieu => lieu.idLieu !== idLieu ).slice();
    this.availableLieu$.next(this.availableLieu);
    return this.availableLieu;
  }
}
