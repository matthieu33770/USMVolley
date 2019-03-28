import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Equipe } from '../Model/Equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  // La liste des equipes
  public availableEquipe: Equipe [];

  // La liste observable que l'on rend visible partout dans l'application
  availableEquipe$: BehaviorSubject<Equipe[]> = new BehaviorSubject(this.availableEquipe);

  constructor(private httpClient: HttpClient) {  }

  public getEquipes(): Observable<Equipe[]> {
    return this.httpClient.get<Equipe[]>('http://localhost:8080/equipes/get/equipes');
  }

  getTeams(): Observable<Equipe[]> {
    return this.httpClient.get<Equipe[]>('http://localhost:8080/equipes/get/equipes');
  }

  public publishEquipes() {
    this.getEquipes().subscribe(
      equipeList => {
        this.availableEquipe = equipeList;
        this.availableEquipe$.next(this.availableEquipe);
      });
  }

  getEquipeByName(libelleEquipe: string): Observable<Equipe> {
    return of(this.availableEquipe.find(equipe => equipe.libelleEquipe === libelleEquipe));
  }

  /**
   * Cette fonction permet de trouver une équipe dans la liste des équipes chargées par l'application
   * grâce à son ID.
   * @param idEquipe l'id qu'il faut rechercher dans la liste.
   */
  public findEquipe(idEquipe: number): Observable<Equipe> {
    if (idEquipe) {
      if (!this.availableEquipe) {
        return this.getEquipes().pipe(map(joueurs => joueurs.find(joueur => joueur.idEquipe === idEquipe)));
      }
      return of(this.availableEquipe.find(joueur => joueur.idEquipe === idEquipe));
    } else {
      return of(new Equipe(null, '', null));
    }
  }

  /**
   * Fonction de création d'une nouvelle équipe.
   * Elle met à jour notre liste d'équipes et notre liste observable.
   * @param newEquipe la nouvelle équipe à créer
   */
  public createEquipe(newEquipe: Equipe) {
    this.httpClient.post<Equipe>('http://localhost:8080/equipes/create', newEquipe).subscribe(
      createEquipe => {
        this.availableEquipe.push(createEquipe);
        this.availableEquipe$.next(this.availableEquipe);
      }
    );
  }

  /**
   * Fonction de mise à jour d'une équipe
   * @param equipe l'équipe à mettre à jour
   */
  public updateEquipe(equipe: Equipe) {
    this.httpClient.put<Equipe>(`http://localhost:8080/joueurs/update/${equipe.idEquipe}`, equipe).subscribe(
      updateEquipe => {
        this.availableEquipe$.next(this.availableEquipe);
      }
    );
  }

  /**
   * Fonction de suppression d'une équipe.
   * Elle met à jour notre liste d'équipe et notre liste observable.
   * @param idEquipe de l'équipe à supprimer
   */
  supprimerEquipe(idEquipe: number): Equipe[] {
    this.availableEquipe = this.availableEquipe.filter( equipe => equipe.idEquipe !== idEquipe ).slice();
    return this.availableEquipe;
  }
}
