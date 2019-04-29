import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Equipe } from '../Model/Equipe';
import { Joueur } from '../Model/Joueur';
import { Categorie } from '../Model/Categorie';

import { EquipesService } from '../Services/equipes.service';
import { JoueursService } from '../Services/joueurs.service';
import { ExcelService } from '../Services/excel.service';
import { CategorieService } from '../Services/categorie.service';

@Component({
  selector: 'app-detail-equipe',
  templateUrl: './detail-equipe.component.html',
  styleUrls: ['./detail-equipe.component.css']
})

export class DetailEquipeComponent implements OnInit {

  isModification: Boolean = false;
  idEquipe: number;
  equipe;
  equipeList: Equipe [];
  joueurAdulte: Joueur [] = [];
  joueurEquipe: Joueur[] = [];
  editionEquipe: Equipe = new Equipe(0, '', new Categorie(1, 'M11', 11), null);
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'licenceJoueur'];
  dataEquipe = new MatTableDataSource<Joueur>();
  dataAdulte = new MatTableDataSource<Joueur>();
  selection = new SelectionModel<Joueur>(true, []);
  categorieList: any = [];
  categorie: Categorie [] = [];
  categoriesList: Categorie [];
  libelleCategorie: String;

  constructor(private route: ActivatedRoute,
              private equipeService: EquipesService,
              private joueurService: JoueursService,
              private categorieService: CategorieService,
              private router: Router,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.idEquipe = +this.route.snapshot.params.idEquipe;
    this.getEquipe();
    this.equipeService.findEquipe(this.idEquipe).subscribe(equipe => {
      this.editionEquipe = equipe; });
    if (this.editionEquipe.categorie === null) {
      this.editionEquipe.categorie = new Categorie(0, 'Choisir', 0);
    }
    if (this.editionEquipe.idEquipe) {
      this.isModification = true;
    }
    this.getAdulte();
    this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
    this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
    console.log(this.dataAdulte);
    console.log(this.dataEquipe);
    this.getCategories();
    this.getCategoriesL();
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipe = Equipes);
  }

  getAdulte(): void {
    this.joueurService.getJoueurs().subscribe(Joueurs => {
                                              Joueurs.forEach( joueur => {
                                              if (joueur.avoir.licence.categories.libelleCategorie === this.editionEquipe.categorie.libelleCategorie) {
                                                this.joueurAdulte.push(joueur); }
                                              joueur.equipes.forEach(equipe => { if (equipe.idEquipe === this.idEquipe) {
                                                this.joueurEquipe.push(joueur); }
                                              });
                                              });
                                              for ( let i = 0; i < this.joueurEquipe.length; i++ ) {
                                                for ( let j = 0; j < this.joueurAdulte.length; j++) {
                                                  if (this.joueurEquipe[i].idJoueur === this.joueurAdulte[j].idJoueur) {
                                                    this.joueurAdulte.splice(this.joueurAdulte.indexOf(this.joueurAdulte[j]), 1); }
                                                }
                                              }
                                              });
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(Categories => this.categorieList = Categories);
  }

  getCategoriesL(): void {
    this.categorieService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.joueurEquipe, 'Export');
  }

  onSave() {
    this.categorieList.forEach( categorie => {
      if (categorie.libelleCategorie === this.editionEquipe.categorie.libelleCategorie) {
        this.categorie = [];
        this.categorie.push(categorie);
      }
    });
    this.editionEquipe.categorie = this.categorie[0];

    // Vérifier si on est en édition ou en création
    if (!this.editionEquipe.idEquipe) {
      this.idEquipe = null;
      this.equipeService.createEquipe(this.editionEquipe);
    } else {
      this.equipeService.updateEquipe(this.editionEquipe);
    }
  }

  ajouter(selected: Joueur) {
    this.joueurEquipe.push(selected[0]);
    this.joueurAdulte.splice(this.joueurAdulte.indexOf(selected[0]), 1);
    this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
    this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
    this.editionEquipe.joueurs.push(selected[0]);
  }

  enlever(selected: Joueur[]) {
    this.joueurEquipe.splice(this.joueurEquipe.indexOf(selected[0]), 1);
    this.joueurAdulte.push(selected[0]);
    this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
    this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
    this.editionEquipe.joueurs.splice(this.editionEquipe.joueurs.indexOf(selected[0]), 1);
  }
}
