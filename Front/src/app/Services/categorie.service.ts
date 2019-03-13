import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Categorie } from '../Model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  // La liste des catégories
  public availableCategorie: Categorie [];

  // La liste observable que l'on rend visible partout dans l'application
  availableCategorie$: BehaviorSubject<Categorie[]> = new BehaviorSubject(this.availableCategorie);

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>('http://localhost:8080/categories/get/categories');
  }

  public getCategorie(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>('http://localhost:8080/categories/get/categories');
  }

  public publishCategories() {
    this.getCategories().subscribe(
      categorieList => {
        this.availableCategorie = categorieList;
        this.availableCategorie$.next(this.availableCategorie);
      });
  }

}
