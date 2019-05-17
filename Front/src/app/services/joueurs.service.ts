import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

import { Joueur } from '../modeles/joueur';
import { User } from '../modeles/user';
import { Role } from '../modeles/role';
import { Fonction } from '../modeles/fonction';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  // La liste des joueurs
  public availableJoueur: Joueur [];

  // La liste observable que l'on rend visible partout dans l'application
  availableJoueur$: BehaviorSubject<Joueur[]> = new BehaviorSubject(this.availableJoueur);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) {  }

  getUsers(): Observable<User[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<User[]>(environment.apiUrl + 'users/get/users');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  getRoles(): Observable<Role[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Role[]>(environment.apiUrl + 'roles/get/roles');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  getFonctions(): Observable<Fonction[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Fonction[]>(environment.apiUrl + 'fonctions/get/fonctions');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  getPlayers(): Observable<Joueur[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Joueur[]>(environment.apiUrl + 'joueurs/get/joueurs');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public getJoueurs(): Observable<Joueur[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Joueur[]>(environment.apiUrl + 'joueurs/get/joueurs');
    } else {
      this.router.navigate(['connexion']);
    }
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
      return of(new Joueur(null, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null));
    }
  }

  /**
   * Fonction de création d'un nouveau joueur.
   * Elle met à jour notre liste de joueur et notre liste observable.
   * @param newJoueur le nouveau joueur à créer
   */
  public createJoueur(newJoueur: Joueur) {
    if (this.loginService.logged) {
      this.httpClient.post<Joueur>('http://localhost:8080/joueurs/create', newJoueur).subscribe(
        createJoueur => {
          this.availableJoueur.push(createJoueur);
          this.availableJoueur$.next(this.availableJoueur);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Cette fonction permet de trouver un user dans la liste des users chargées par l'application
   * grâce à son Username.
   * @param User le username qu'il faut rechercher dans la liste.
   */
  public findByUser(idUser: number): Observable<Joueur> {
    if (idUser) {
      console.log(idUser);
      if (!this.availableJoueur) {
        return this.getJoueurs().pipe(map(joueurs => joueurs.find(joueur => joueur.user.idUser === idUser)));
      }
      return of(this.availableJoueur.find(joueur => joueur.user.idUser === idUser));
    } else {
      return of(new Joueur(null, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null));
    }
  }

  /**
   * Cette fonction permet de trouver un user dans la liste des users chargées par l'application
   * grâce à son Username.
   * @param username le username qu'il faut rechercher dans la liste.
   */
  public findByUsername(username: String): Observable<Joueur> {
    if (username) {
      console.log(username);
      if (!this.availableJoueur) {
        return this.getJoueurs().pipe(map(joueurs => joueurs.find(joueur => joueur.user.username === username)));
      }
      return of(this.availableJoueur.find(joueur => joueur.user.username === username));
    } else {
      return of(new Joueur(null, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null));
    }
  }

  getJoueurByName(nomJoueur: String): Observable<Joueur> {
    return of(this.availableJoueur.find(joueur => joueur.nom === nomJoueur));
  }

  /**
   * Fonction de mise à jour d'un joueur
   * @param joueur le joueur à mettre à jour
   */
  public updateJoueur(joueur: Joueur) {
    if (this.loginService.logged) {
      this.httpClient.put<Joueur>(`http://localhost:8080/joueurs/update/${joueur.idJoueur}`, joueur).subscribe(
        updateJoueur => {
          this.availableJoueur$.next(this.availableJoueur);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de suppression d'un joueur.
   * Elle met à jour notre liste de joueurs et notre liste observable.
   * @param idJoueur du joueur à supprimer
   */
  supprimerJoueur(idJoueur: number): Joueur[] {
    if (this.loginService.logged) {
      this.httpClient.delete('http://localhost:8080/joueurs/delete/' + idJoueur).subscribe(
            () => { console.log('suppression joueur OK : ', idJoueur);
                },
            (error) => console.log('suppression joueur pb : ', error)
        );
        this.availableJoueur$.next(this.availableJoueur);
      return this.availableJoueur;
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Uploader les documents pour la licence
   * param data
   */
  public addDocument(data) {
    if (this.loginService.logged) {
      this.httpClient.post('http://localhost:8080/joueurs/upload', data).subscribe(
        () => { console.log('dedans'); },
        (error) => {console.log('error : ', error); }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }
}
