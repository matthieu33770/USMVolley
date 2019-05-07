import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ArticlesService } from '../Services/articles.service';

import { Article } from '../Model/Article';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  articleList: BehaviorSubject<Article[]>;

  constructor(private articleService: ArticlesService) { }

  ngOnInit() {
    this.articleService.publishArticles();
    this.articleList = this.articleService.reverseAvailableArticle$;
  }

  filterBy(idArticle: number) {
    return this.articleService.availableArticle.sort((a, b) => a[idArticle] > b[idArticle] ? 1 : a[idArticle] === b[idArticle] ? 0 : -1);
  }

}
