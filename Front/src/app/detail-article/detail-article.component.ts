import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { FileInformation } from '../file-information';

import { Article } from '../Model/Article';

import { ExcelService } from '../Services/excel.service';
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
  articleForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  photoTest: string;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private articleService: ArticlesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.idArticle = Number(this.route.snapshot.params.idArticle);
    console.log(this.idArticle);
    this.getArticle();
    console.log(this.getArticle());
    this.articleService.findArticle(this.idArticle).subscribe(article => {
      this.editionArticle = article; });

    console.log(this.editionArticle);
    if (this.idArticle) {
      this.isModification = true;
    }
    this.createForm();
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

  createForm() {
    this.articleForm = this.formBuilder.group({
      articleGroup: this.formBuilder.group({
        titreArticle: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      },
      {validator: this.checkTitre.bind(this)}),
      titreArticle: '',
      contenuArticle: '',
      photoTest: '',
      userFile: null,
    });
  }

  checkTitre(group: FormGroup) {
    let titreArticle: string;
    titreArticle = group.get('titreArticle').value;
    const isValid = !(this.editionArticle.titreArticle === titreArticle);
    return isValid ? null : { checkTitre: true };
  }

  onSelectPhoto(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.articleForm.get('photoTest').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  select(): void {
    this.fileInput.nativeElement.click();
  }

  public onRegister() {
    const data: FormData = new FormData();

    if (this.file !== undefined) {
      this.photoTest = 'article.jpg';
      data.append('data', this.file, this.photoTest);
      this.articleService.addPhoto(data);
    } else {
      // this.offresService.addWatchCategory(this.nameWatch, this.priceWatch, this.descriptionWatch, this.imageWatch);
    }
  }

}
