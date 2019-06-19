import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Article } from '../modeles/article';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  // La liste des articles
  public availableArticle: Article [];
  public reverseAvailableArticle: Article [];

  // La liste observable que l'on rend visible partout dans l'application
  availableArticle$: BehaviorSubject<Article[]> = new BehaviorSubject(this.availableArticle);
  reverseAvailableArticle$: BehaviorSubject<Article[]> = new BehaviorSubject(this.reverseAvailableArticle);

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

  public getArticles(): Observable<Article[]> {
      return this.httpClient.get<Article[]>('http://localhost:5000/articles/get/articles');
  }

  getArt(): Observable<Article[]> {
    if (this.loginService.logged) {
      return this.httpClient.get<Article[]>('http://localhost:5000/articles/get/articles');
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public publishArticles() {
    this.getArticles().subscribe(
      articleList => {
        this.availableArticle = articleList;
        this.availableArticle$.next(this.availableArticle);
        this.reverseAvailableArticle = this.availableArticle.slice().reverse();
        this.reverseAvailableArticle$.next(this.reverseAvailableArticle);
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
    if (this.loginService.logged) {
      this.httpClient.post<Article>('http://localhost:5000/articles/create', newArticle).subscribe(
        createArticle => {
          this.availableArticle.push(createArticle);
          this.availableArticle$.next(this.availableArticle);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de mise à jour d'un article
   * @param article l'article à mettre à jour
   */
  public updateArticle(article: Article) {
    if (this.loginService.logged) {
      this.httpClient.put<Article>(`http://localhost:5000/articles/update/${article.idArticle}`, article).subscribe(
        updateArticle => {
          this.availableArticle.splice(this.availableArticle.indexOf(article), 1, updateArticle);
          this.availableArticle$.next(this.availableArticle);
        }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Fonction de suppression d'un article.
   * Elle met à jour notre liste d'articles et notre liste observable.
   * @param idArticle de l'article à supprimer
   */
  supprimerArticle(idArticle: number): Article[] {
    if (this.loginService.logged) {
      this.httpClient.delete('http://localhost:5000/articles/delete/' + idArticle).subscribe(
            () => { console.log('suppression article OK : ', idArticle);
                    this.availableArticle.splice(this.availableArticle.indexOf(this.availableArticle.find(article => article.idArticle === idArticle), 1));
                    this.availableArticle$.next(this.availableArticle);
                },
            (error) => console.log('suppression article pb : ', error)
        );
      return this.availableArticle;
    } else {
      this.router.navigate(['connexion']);
    }
  }

  /**
   * Uploader les photos d'un article
   * param data
   */
  public addPhoto(data) {
    if (this.loginService.logged) {
      this.httpClient.post('http://localhost:5000/articles/upload', data).subscribe(
        () => { console.log('dedans'); },
        (error) => {console.log('error : ', error); }
      );
    } else {
      this.router.navigate(['connexion']);
    }
  }
}
