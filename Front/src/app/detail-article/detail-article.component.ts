import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ExcelService } from '../Services/excel.service';

import { Article } from '../Model/Article';

import { ArticlesService } from '../Services/articles.service';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  isModification: Boolean = false;
  idArticle: number;
  article;
  editionArticle: Article = new Article(0, '', '', '');
  public uploaderPhoto: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});

  constructor(private route: ActivatedRoute,
              private articleService: ArticlesService,
              private router: Router,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.idArticle = Number(this.route.snapshot.params.idArticle);
    console.log(this.idArticle);
    this.getArticle();
    console.log(this.getArticle());
    this.articleService.findArticle(this.idArticle).subscribe(article => {
      this.editionArticle = article; });

    this.uploaderPhoto.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderPhoto.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };

    console.log(this.editionArticle);
    if (this.idArticle) {
      this.isModification = true;
    }
  }

  getArticle(): void {
    this.articleService.getArticles().subscribe(Articles => this.article = Articles);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.article, 'Export');
  }

  modifier() {
    this.articleService.updateArticle(this.editionArticle);
  }

}
