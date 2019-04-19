import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Categorie } from '../Model/Categorie';

import { CategorieService } from '../Services/categorie.service';

@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.component.html',
  styleUrls: ['./detail-categorie.component.css']
})
export class DetailCategorieComponent implements OnInit {

  isModification: Boolean = false;
  titre: String;
  idCategorie: number;
  categories: Categorie [] = [];
  categorieList: Categorie [];
  editionCategorie: Categorie = new Categorie(0, '', 0);

  constructor(private route: ActivatedRoute,
              private categorieService: CategorieService,
              private router: Router) { }

  ngOnInit() {
    this.idCategorie = Number(this.route.snapshot.params.idCategorie);
    this.getCategorie();
    this.categorieService.findCategories(this.idCategorie).subscribe(statut => {
      this.editionCategorie = statut; });
    console.log(this.idCategorie);
    console.log(this.isModification);
    if (this.idCategorie) {
      this.isModification = true;
    }
  }

  getCategorie(): void {
    this.categorieService.getCategories().subscribe(Categories => this.categorieList = Categories);
  }

  onSave() {
    // Vérifier si on est en édition ou en création
    if (!this.editionCategorie) {
      this.idCategorie = null;
      this.categorieService.createCategorie(this.editionCategorie);
    } else {
    console.log(this.editionCategorie);
    this.categorieService.updateCategorie(this.editionCategorie);
    }
  }
}

