import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../Model/Article';

import { ArticlesService } from '../Services/articles.service';

@Component({
  selector: 'app-consultation-article',
  templateUrl: './consultation-article.component.html',
  styleUrls: ['./consultation-article.component.css']
})
export class ConsultationArticleComponent implements OnInit {

  idArticle: number;
  consultationArticle: Article = new Article(0, '', '', '');

  constructor(private route: ActivatedRoute,
              private articleService: ArticlesService) { }

  ngOnInit() {
    this.idArticle = +this.route.snapshot.params.idArticle;
    console.log(this.idArticle);

    this.articleService.findArticle(this.idArticle).subscribe(article => {
      this.consultationArticle = article;
      console.log(this.consultationArticle);
    });
  }

}
