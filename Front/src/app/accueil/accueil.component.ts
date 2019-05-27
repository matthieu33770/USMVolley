import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ArticlesService } from '../services/articles.service';

import { Article } from '../modeles/article';


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

}
