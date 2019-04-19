import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Statut } from '../Model/Statut';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  // La liste des statuts
  public availableStatut: Statut [];

  // La liste observable que l'on rend visible partout dans l'application
  availableStatut$: BehaviorSubject<Statut[]> = new BehaviorSubject(this.availableStatut);

  constructor(private httpClient: HttpClient) { }

  public getStatuts(): Observable<Statut[]> {
    return this.httpClient.get<Statut[]>('http://localhost:8080/statuts/get/statuts');
  }

  public publishStatuts() {
    this.getStatuts().subscribe(
      statutList => {
        this.availableStatut = statutList;
        this.availableStatut$.next(this.availableStatut);
      });
  }

  /**
   * Cette fonction permet de trouver un statut dans la liste des statuts chargées par l'application
   * grâce à son ID.
   * @param idStatut l'id qu'il faut rechercher dans la liste.
   */
  public findStatut(idStatut: number): Observable<Statut> {
    if (idStatut) {
      if (!this.availableStatut) {
        return this.getStatuts().pipe(map(statuts => statuts.find(statut => statut.idStatut === idStatut)));
      }
      return of(this.availableStatut.find(statut => statut.idStatut === idStatut));
    } else {
      return of(new Statut(0, ''));
    }
  }

  /**
   * Fonction de création d'un nouveau statut.
   * Elle met à jour notre liste de statut et notre liste observable.
   * @param newStatut le nouveau lieu à créer
   */
  public createStatut(newStatut: Statut) {
    this.httpClient.post<Statut>('http://localhost:8080/statuts/create', newStatut).subscribe(
      createStatut => {
        this.availableStatut.push(createStatut);
        this.availableStatut$.next(this.availableStatut);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un statut
   * @param statut le statut à mettre à jour
   */
  public updateStatut(statut: Statut) {
    this.httpClient.put<Statut>(`http://localhost:8080/statuts/update/${statut.idStatut}`, statut).subscribe(
      updateStatut => {
        this.availableStatut$.next(this.availableStatut);
      }
    );
  }

  /**
   * Fonction de suppression d'un statut.
   * Elle met à jour notre liste de statut et notre liste observable.
   * @param idStatut du statut à supprimer
   */
  supprimerStatut(idStatut: number): Statut[] {
    this.httpClient.delete('http://localhost:8080/statuts/delete/' + idStatut).subscribe(
          () => { console.log('suppression statut OK : ', idStatut);
              },
          (error) => console.log('suppression statut pb : ', error)
      );
    this.availableStatut = this.availableStatut.filter( statut => statut.idStatut !== idStatut ).slice();
    this.availableStatut$.next(this.availableStatut);
    return this.availableStatut;
  }


  /**
   * Fonction de suppression d'un statut.
   * Elle met à jour notre liste de statut et notre liste observable.
   * @param statut de l'équipe à supprimer
   */
  // public idStatut(idStatut: number): Statut[] {
  //   this.httpClient.delete<Statut>(`http://localhost:8080/statuts/delete/${idStatut}`, statut).subscribe(
  //     deleteStatut => {
  //       this.availableStatut$.next(this.availableStatut);
  //     }
  //   );
  // }
}
