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
    this.articleList = this.articleService.availableArticle$;
    console.log(this.articleService.availableArticle$);
    console.log(this.articleList);
  }

}
