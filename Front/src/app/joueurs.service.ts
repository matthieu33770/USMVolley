import { Injectable } from '@angular/core';
import { Joueur } from './Model/Joueur';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  // La liste des joueurs
  public availableJoueur: Joueur [];

  // La liste observable que l'on rend visible partout dans l'application
  availableJoueur$: BehaviorSubject<Joueur[]> = new BehaviorSubject(this.availableJoueur);

  constructor(private httpClient: HttpClient) {  }
  /**
   * La fonction getJoueurs() est privée car elle n'a besoin d'être appellée que dans le service.
   */
  public getJoueurs(): Observable<Joueur[]> {
    return this.httpClient.get<Joueur[]>('http://localhost:8080/homeediteur/get/alleditors');
  }

  public publishJoueurs() {
    this.getJoueurs().subscribe(
      joueurList => {
        this.availableJoueur = joueurList;
        this.availableJoueur$.next(this.availableJoueur);
      });
  }

  /**
   * Cette fonction permet de trouver un joueur dans la liste des joueurs chargés par l'application
   * grâce à son ID.
   * @param idJoueur l'id qu'il faut rechercher dans la liste.
   */
  public findJoueur(idJoueur: number): Observable<Joueur> {
    if (idJoueur) {
      if (!this.availableJoueur) {
        return this.getJoueurs().pipe(map(joueurs => joueurs.find(joueur => joueur.idJoueur === idJoueur)));
      }
      return of(this.availableJoueur.find(joueur => joueur.idJoueur === idJoueur));
    } else {
      return of(new Joueur(null, ''));
    }
  }

  /**
   * Fonction de création d'un nouveau joueur.
   * Elle met à jour notre liste de joueurq et notre liste observable.
   * @param newJoueur le nouveau livre à créer
   */
  public createJoueur(newJoueur: Joueur) {
    this.httpClient.post<Joueur>('http://localhost:8080/homeediteur/post', newJoueur).subscribe(
      createJoueur => {
        this.availableJoueur.push(createJoueur);
      }
    );
  }

  getJoueurByName(nomJoueur: string): Observable<Joueur> {
    return of(this.availableJoueur.find(editeur => editeur.nomJoueur === nomJoueur));
  }
}
