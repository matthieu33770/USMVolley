import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Creneau } from '../Model/Creneau';
import { Categorie } from '../Model/Categorie';

import { CreneauxService } from '../Services/creneaux.service';
import { CategorieService } from '../Services/categorie.service';

@Component({
  selector: 'app-detail-creneaux',
  templateUrl: './detail-creneaux.component.html',
  styleUrls: ['./detail-creneaux.component.css']
})
export class DetailCreneauxComponent implements OnInit {

  isModification: Boolean = false;
  titre: String;
  idCreneau: number;
  creneaux: Creneau [] = [];
  creneauList: Creneau [];
  editionCreneau: Creneau = new Creneau(0, '', new Categorie(1, 'M11', 11));
  editionCategorie: Categorie = new Categorie(0, '', 0);
  categorieList: any = [];
  categorie: Categorie [] = [];
  categoriesList: Categorie [];
  libelleCategorie: String;

  constructor(private route: ActivatedRoute,
              private creneauService: CreneauxService,
              private categorieService: CategorieService,
              private router: Router) { }

  ngOnInit() {
    this.idCreneau = Number(this.route.snapshot.params.idCreneau);
    this.getCreneau();
    this.creneauService.findCreneau(this.idCreneau).subscribe(creneau => {
      this.editionCreneau = creneau; });
    if (this.editionCreneau.categorie === null) {
      this.editionCreneau.categorie = new Categorie(0, 'Choisir', 0);
    }
    console.log(this.idCreneau);
    console.log(this.isModification);
    if (this.idCreneau) {
      this.isModification = true;
    }
    console.log(this.isModification);
    this.getCategories();
    this.getCategoriesL();
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(Categories => this.categorieList = Categories);
  }

  getCategoriesL(): void {
    this.categorieService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  getCreneau(): void {
    this.creneauService.getCreneaux().subscribe(Creneaux => this.creneauList = Creneaux);
  }

  onSave() {
    console.log(this.editionCreneau.categorie.libelleCategorie);
    this.categorieList.forEach( categorie => {
      if (categorie.libelleCategorie === this.editionCreneau.categorie.libelleCategorie) {
        this.categorie = [];
        this.categorie.push(categorie);
      }
    });
    this.editionCreneau.categorie = this.categorie[0];

    // Vérifier si on est en édition ou en création
    if (!this.editionCreneau) {
      this.idCreneau = null;
      this.creneauService.createCreneau(this.editionCreneau);
    } else {
      console.log(this.editionCreneau);
      this.creneauService.updateCreneau(this.editionCreneau);
    }
  }
}
