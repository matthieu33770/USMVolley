import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Article } from '../Model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  // La liste des articles
  public availableArticle: Article [];

  // La liste observable que l'on rend visible partout dans l'application
  availableArticle$: BehaviorSubject<Article[]> = new BehaviorSubject(this.availableArticle);

  constructor(private httpClient: HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:8080/articles/get/articles');
  }

  getArt(): Observable<Article[]> {
    return this.httpClient.get<Article[]>('http://localhost:8080/articles/get/articles');
  }

  public publishArticles() {
    this.getArticles().subscribe(
      articleList => {
        this.availableArticle = articleList;
        this.availableArticle$.next(this.availableArticle);
      });
  }

  /**
   * Cette fonction permet de trouver un article dans la liste des articles chargées par l'application
   * grâce à son ID.
   * @param idArticle l'id qu'il faut rechercher dans la liste.
   */
  public findArticle(idArticle: number): Observable<Article> {
    if (idArticle) {
      if (!this.availableArticle) {
        return this.getArticles().pipe(map(articles => articles.find(article => article.idArticle === idArticle)));
      }
      return of(this.availableArticle.find(article => article.idArticle === idArticle));
    } else {
      return of(new Article(0, '', '', ''));
    }
  }

   /**
   * Fonction de création d'un nouvel article.
   * Elle met à jour notre liste d'articles et notre liste observable.
   * @param newArticle le nouvel article à créer
   */
  public createArticle(newArticle: Article) {
    this.httpClient.post<Article>('http://localhost:8080/equipes/create', newArticle).subscribe(
      createArticle => {
        this.availableArticle.push(createArticle);
        this.availableArticle$.next(this.availableArticle);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un article
   * @param article l'article à mettre à jour
   */
  public updateArticle(article: Article) {
    this.httpClient.put<Article>(`http://localhost:8080/joueurs/update/${article.idArticle}`, article).subscribe(
      updateArticle => {
        this.availableArticle$.next(this.availableArticle);
      }
    );
  }

  /**
   * Fonction de suppression d'un article.
   * Elle met à jour notre liste d'articles et notre liste observable.
   * @param idArticle de l'article à supprimer
   */
  supprimerArticle(idArticle: number): Article[] {
    this.availableArticle = this.availableArticle.filter( article => article.idArticle !== idArticle ).slice();
    return this.availableArticle;
  }
}
