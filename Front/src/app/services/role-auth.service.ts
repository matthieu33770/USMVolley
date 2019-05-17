import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Role } from '../modeles/role';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthService {

  private availableRoleAuth: Role [];
  availableRoleAuth$: BehaviorSubject<Role []> = new BehaviorSubject(this.availableRoleAuth);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  public getRoleAuth(): Observable<Role[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Role[]>('http://localhost:8080/roles/get/roles');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishRoleAuth() {
    this.getRoleAuth().subscribe(
      roleList => {
        this.availableRoleAuth = roleList;
        this.availableRoleAuth$.next(this.availableRoleAuth);
      }
    );
  }

  /**
   * Cette fonction permet de trouver un role dans la liste des roles chargés par l'application
   * grâce à son ID.
   * @param idRole l'id qu'il faut rechercher dans la liste.
   */
  public findRoleAuthById(idRole: number): Observable<Role> {
    if (idRole) {
      if (!this.availableRoleAuth) {
        return this.getRoleAuth().pipe(map(roles => roles.find(role => role.idRole === idRole)));
      }
      return of(this.availableRoleAuth.find(role => role.idRole === idRole));
    } else {
      return of(new Role(0, '', ''));
    }
  }

  /**
   * Cette fonction permet de trouver un role dans la liste des roles chargés par l'application
   * grâce à son Username associé.
   * @param username le username qu'il faut rechercher dans la liste.
   */
  public findRoleAuthByUsername(username: String): Observable<Role> {
    if (username) {
      if (!this.availableRoleAuth) {
        return this.getRoleAuth().pipe(map(roles => roles.find(role => role.username === username)));
      }
      return of(this.availableRoleAuth.find(role => role.username === username));
    } else {
      return of(new Role(0, '', ''));
    }
  }

  /**
   * Fonction de création d'un nouveau role.
   * Elle met à jour notre liste de roles et notre liste observable.
   * @param newRoleAuth le nouveau role à créer
   */
  public createRoleAuth(newRoleAuth: Role) {
    if (this.loginService.logged) {
    this.httpClient.post<Role>('http://localhost:8080/roles/create', newRoleAuth).subscribe(
      newRole => {
        this.availableRoleAuth.push(newRole);
        this.availableRoleAuth$.next(this.availableRoleAuth);
      }
    );
  } else {
    this.router.navigate(['connexion']);
  }
  }

   /**
   * Fonction de mise à jour d'un role.
   * @param roleAuth le role à mettre à jour
   */
  public updateRoleAuth(roleAuth: Role) {
    if (this.loginService.logged) {
    this.httpClient.put<Role>('http://localhost:8080/roles/update/' + roleAuth.idRole, roleAuth).subscribe(
      updateRoleAuth => {
        this.availableRoleAuth.splice(this.availableRoleAuth.indexOf(roleAuth), 1, roleAuth);
        this.availableRoleAuth$.next(this.availableRoleAuth);
      }
    );
  } else {
    this.router.navigate(['connexion']);
  }
  }

  /**
   * Fonction de suppression d'un role.
   * @param idRole le role à supprimer
   */
  public deleteRoleAuth(idRole: number) {
    if (this.loginService.logged) {
    this.httpClient.delete<Role>('http:localhost:8080/roles/delete/' + idRole).subscribe(
      deleteRoleAuth => {
        this.availableRoleAuth.splice(this.availableRoleAuth.indexOf(
                                      this.availableRoleAuth.find(role => role.idRole === idRole)), 1);
        this.availableRoleAuth$.next(this.availableRoleAuth);
      }
    );
  } else {
    this.router.navigate(['connexion']);
  }
  }

}
