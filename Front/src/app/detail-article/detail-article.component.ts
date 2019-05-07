import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { FileInformation } from '../file-information';

import { Article } from '../Model/Article';

import { ExcelService } from '../Services/excel.service';
import { ArticlesService } from '../Services/articles.service';

const chem = 'assets/photos';

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
  photoArticle: string;
  cheminArticle: string;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private articleService: ArticlesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.idArticle = Number(this.route.snapshot.params.idArticle);
    this.getArticle();
    this.articleService.findArticle(this.idArticle).subscribe(article => {
      this.editionArticle = article; });
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
      photoArticle: '',
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
      this.articleForm.get('photoArticle').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  select(): void {
    this.fileInput.nativeElement.click();
  }

  onSave() {
    // Vérifier si on est en édition ou en création
    if (!this.editionArticle.idArticle) {
      this.idArticle = null;
      this.onRegister();
      this.editionArticle.photoArticle = chem + '/' + this.photoArticle;
      this.articleService.createArticle(this.editionArticle);
    } else {
      if (chem + '/' + this.photoArticle === '') {
        console.log('je passe');
        this.onRegister();
      }
    this.articleService.updateArticle(this.editionArticle);
    }
  }

  public onRegister() {
    const data: FormData = new FormData();

    if (this.file !== undefined) {
      this.photoArticle = this.file.name;
      data.append('data', this.file, this.photoArticle);
      this.articleService.addPhoto(data);
      console.log('photo enregistrée');
    }
  }

}
