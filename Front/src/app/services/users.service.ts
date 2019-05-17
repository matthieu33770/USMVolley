import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../modeles/user';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // La liste des equipes
  public availableUser: User [];

  // La liste observable que l'on rend visible partout dans l'application
  availableUser$: BehaviorSubject<User[]> = new BehaviorSubject(this.availableUser);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  public getUsers(): Observable<User[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<User[]>('http://localhost:8080/users/get/users');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishUsers() {
    this.getUsers().subscribe(
      userList => {
        this.availableUser = userList;
        this.availableUser$.next(this.availableUser);
      });
  }

  getUserByUsername(username: string): Observable<User> {
    return of(this.availableUser.find(user => user.username === username));
  }

  /**
   * Cette fonction permet de trouver un user dans la liste des users chargées par l'application
   * grâce à son ID.
   * @param idUser l'id qu'il faut rechercher dans la liste.
   */
  public findUser(idUser: number): Observable<User> {
    if (idUser) {
      console.log(idUser);
      if (!this.availableUser) {
        return this.getUsers().pipe(map(users => users.find(user => user.idUser === idUser)));
      }
      return of(this.availableUser.find(user => user.idUser === idUser));
    } else {
      return of(new User(0, '', '', null));
    }
  }

  /**
   * Cette fonction permet de trouver un user dans la liste des users chargées par l'application
   * grâce à son Username.
   * @param username le username qu'il faut rechercher dans la liste.
   */
  public findByUsername(username: String): Observable<User> {
    if (username) {
      console.log(username);
      if (!this.availableUser) {
        return this.getUsers().pipe(map(users => users.find(user => user.username === username)));
      }
      return of(this.availableUser.find(user => user.username === username));
    } else {
      return of(new User(0, '', '', null));
    }
  }

  /**
   * Fonction de création d'un nouvel user.
   * Elle met à jour notre liste de user et notre liste observable.
   * @param newUser le nouvel user à créer
   */
  public createUser(newUser: User) {
    if (this.loginService.logged) {
      this.httpClient.post<User>('http://localhost:8080/users/create', newUser).subscribe(
        createEquipe => {
          this.availableUser.push(createEquipe);
          this.availableUser$.next(this.availableUser);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de mise à jour d'un user
   * @param user le user à mettre à jour
   */
  public updateUser(user: User) {
    if (this.loginService.logged) {
      return this.httpClient.put<User>(`http://localhost:8080/users/update/${user.idUser}`, user);
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de suppression d'un user.
   * Elle met à jour notre liste de user et notre liste observable.
   * @param idUser du user à supprimer
   */
  supprimerUser(idUser: number): User[] {
    if (this.loginService.logged) {
      this.httpClient.delete('http://localhost:8080/users/delete/' + idUser).subscribe(
      () => { console.log('suppression statut OK : ', idUser);
          },
      (error) => console.log('suppression statut pb : ', error)
      );
      this.availableUser = this.availableUser.filter( user => user.idUser !== idUser ).slice();
      this.availableUser$.next(this.availableUser);
      return this.availableUser;
    } else {
    this.router.navigate(['connexion']);
    }
  }
}
