import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Categorie } from '../modeles/categorie';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  // La liste des catégories
  public availableCategorie: Categorie [];

  // La liste observable que l'on rend visible partout dans l'application
  availableCategorie$: BehaviorSubject<Categorie[]> = new BehaviorSubject(this.availableCategorie);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  getCategories(): Observable<Categorie[]> {
      return this.httpClient.get<Categorie[]>('http://localhost:5000/categories/get/categories');
  }

  public getCategorie(): Observable<Categorie[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Categorie[]>('http://localhost:5000/categories/get/categories');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishCategories() {
    this.getCategories().subscribe(
      categorieList => {
        this.availableCategorie = categorieList;
        this.availableCategorie$.next(this.availableCategorie);
      });
  }

  /**
   * Cette fonction permet de trouver un statut dans la liste des categories chargées par l'application
   * grâce à son ID.
   * @param idCategorie l'id qu'il faut rechercher dans la liste.
   */
  public findCategories(idCategorie: number): Observable<Categorie> {
    if (idCategorie) {
      if (!this.availableCategorie) {
        return this.getCategories().pipe(map(categories => categories.find(categorie => categorie.idCategorie === idCategorie)));
      }
      return of(this.availableCategorie.find(categorie => categorie.idCategorie === idCategorie));
    } else {
      return of(new Categorie(0, '', 0));
    }
  }

  /**
   * Fonction de création d'un nouvelle Categorie.
   * Elle met à jour notre liste de Categories et notre liste observable.
   * @param newCategorie la nouvelle Categorie à créer
   */
  public createCategorie(newCategorie: Categorie) {
    if (this.loginService.logged) {
      this.httpClient.post<Categorie>('http://localhost:5000/categories/create', newCategorie).subscribe(
        createCategorie => {
          this.availableCategorie.push(createCategorie);
          this.availableCategorie$.next(this.availableCategorie);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de mise à jour d'une Categorie
   * @param categorie la Categorie à mettre à jour
   */
  public updateCategorie(categorie: Categorie) {
    if (this.loginService.logged) {
      this.httpClient.put<Categorie>(`http://localhost:5000/categories/update/${categorie.idCategorie}`, categorie).subscribe(
        updateCategorie => {
          this.availableCategorie.splice(this.availableCategorie.indexOf(categorie), 1, updateCategorie);
          this.availableCategorie$.next(this.availableCategorie);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de suppression d'une Categorie.
   * Elle met à jour notre liste de Categories et notre liste observable.
   * @param idCategorie la Categorie à supprimer
   */
  supprimerCategorie(idCategorie: number): Categorie[] {
    if (this.loginService.logged) {
      this.httpClient.delete('http://localhost:5000/categories/delete/' + idCategorie).subscribe(
            () => { console.log('suppression categorie OK : ', idCategorie);
                    this.availableCategorie = this.availableCategorie.filter( categorie => categorie.idCategorie !== idCategorie ).slice();
                    this.availableCategorie$.next(this.availableCategorie);
                },
            (error) => console.log('suppression categorie pb : ', error)
        );
      return this.availableCategorie;
    } else {
      this.router.navigate(['connexion']);
    }
  }

}
