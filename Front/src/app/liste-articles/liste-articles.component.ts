import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Article } from '../Model/Article';

import { ArticlesService } from '../Services/articles.service';
import { ExcelService } from '../Services/excel.service';

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.css']
})
export class ListeArticlesComponent implements OnInit, OnDestroy {

  idArticle: number;
  articleList: BehaviorSubject<Article[]>;
  articles: Article [] = [];
  displayedColumns: string[] = ['select', 'titreArticle', 'photoArticle', 'contenuArticle'];
  dataSource = new MatTableDataSource<Article>();
  selection = new SelectionModel<Article>(false, []);
  teams: any = [];

  subArticle: Subscription;

  constructor(private router: Router, private articleService: ArticlesService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subArticle = this.articleService.availableArticle$.subscribe(Articles => {
      this.articles = Articles;
      this.getArticle();
    });
  }

  getArticle(): void {
    if (this.articles) {
      this.dataSource = new MatTableDataSource<Article>(this.articles);
    } else {
      this.articleService.publishArticles();
    }
  }

  getArticles(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.articleService.getArt().subscribe(Article => this.teams = Article);
  }

  onEdit(selected: Article[]) {
    this.router.navigate(['gestion/articles/redactionArticle/' + selected[0].idArticle]);
  }

  delete(selected: Article[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.articleService.supprimerArticle(selected[0].idArticle);
      this.articleService.availableArticle.splice(this.articleService.availableArticle.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Article>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subArticle) {
      this.subArticle.unsubscribe();
    }
  }
}
