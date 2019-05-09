import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // La liste des equipes
  public availableUser: User [];

  // La liste observable que l'on rend visible partout dans l'application
  availableUser$: BehaviorSubject<User[]> = new BehaviorSubject(this.availableUser);

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/users/get/users');
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
      return of(new User(0, '', '', false, [], null));
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
      return of(new User(0, '', '', false, [], null));
    }
  }

  /**
   * Fonction de création d'un nouvel user.
   * Elle met à jour notre liste de user et notre liste observable.
   * @param newUser le nouvel user à créer
   */
  public createUser(newUser: User) {
    this.httpClient.post<User>('http://localhost:8080/users/create', newUser).subscribe(
      createEquipe => {
        this.availableUser.push(createEquipe);
        this.availableUser$.next(this.availableUser);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un user
   * @param user le user à mettre à jour
   */
  public updateUser(user: User) {
    console.log(user);
    console.log('http://localhost:8080/users/update/' + user.idUser + user.username);
    return this.httpClient.put<User>(`http://localhost:8080/users/update/${user.idUser}`, user);
  }

  /**
   * Fonction de suppression d'un user.
   * Elle met à jour notre liste de user et notre liste observable.
   * @param idUser du user à supprimer
   */
  supprimerEquipe(idUser: number): User[] {
    this.availableUser = this.availableUser.filter( user => user.idUser !== idUser ).slice();
    return this.availableUser;
  }
}
