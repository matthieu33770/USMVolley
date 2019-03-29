import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../Services/articles.service';
import { ExcelService } from '../Services/excel.service';
import { Router } from '@angular/router';
import { Article } from '../Model/Article';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.css']
})
export class ListeArticlesComponent implements OnInit {

  idArticle: number;
  articleList: BehaviorSubject<Article[]>;
  articles: Article [] = [];
  displayedColumns: string[] = ['select', 'titreArticle', 'photoArticle', 'contenuArticle'];
  dataSource = new MatTableDataSource<Article>();
  selection = new SelectionModel<Article>(false, []);
  teams: any = [];

  constructor(private router: Router, private articleService: ArticlesService, private excelService: ExcelService) { }

  ngOnInit() {
    this.articleList = this.articleService.availableArticle$;
    this.getArticle();
    this.getArticles();
    this.articleService.getArticles().subscribe(Articles => {this.dataSource = new MatTableDataSource<Article>(Articles); });
  }

  getArticle(): void {
    this.articleService.getArticles().subscribe(Articles => this.articles = Articles);
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
      this.articleService.availableArticle.splice(this.articleService.availableArticle.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Article>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }
}
