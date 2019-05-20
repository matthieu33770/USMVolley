import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Equipe } from '../modeles/equipe';
import { Joueur } from '../modeles/joueur';
import { Categorie } from '../modeles/categorie';

import { EquipesService } from '../services/equipes.service';
import { JoueursService } from '../services/joueurs.service';
import { ExcelService } from '../services/excel.service';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-detail-equipe',
  templateUrl: './detail-equipe.component.html',
  styleUrls: ['./detail-equipe.component.css']
})

export class DetailEquipeComponent implements OnInit {

  isModification: Boolean = false;
  idEquipe: number;
  equipe;
  couleur: string;
  equipeList: Equipe [];
  joueurAdulte: Joueur [] = [];
  joueurEquipe: Joueur[] = [];
  editionEquipe: Equipe = new Equipe(0, '', '', new Categorie(1, 'M11', 11), null);
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'licenceJoueur'];
  dataEquipe = new MatTableDataSource<Joueur>();
  dataAdulte = new MatTableDataSource<Joueur>();
  selection = new SelectionModel<Joueur>(true, []);
  categorieList: any = [];
  categorie: Categorie [] = [];
  categoriesList: Categorie [];
  libelleCategorie: String;
  i: number;

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
      this.editionEquipe = equipe;
      this.couleur = this.editionEquipe.couleur; });
    if (this.editionEquipe.categorie === null) {
      this.editionEquipe.categorie = new Categorie(0, 'Choisir', 0);
      this.couleur = '';
    }
    if (this.editionEquipe.idEquipe) {
      this.isModification = true;
    }
    this.getAdulte();
    this.getCategories();
    this.getCategoriesL();
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => {this.equipe = Equipes; });
  }

  getAdulte(): void {
    this.joueurService.getJoueurs().subscribe(Joueurs => {
                                              console.log(Joueurs);
                                              Joueurs.forEach( joueur => {
                                                console.log(joueur);
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
                                              this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
                                              this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
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
    console.log(this.editionEquipe);

    // Vérifier si on est en édition ou en création
    if (this.editionEquipe.idEquipe === 0 || this.editionEquipe.idEquipe === null) {
      this.editionEquipe.couleur = this.couleur;
      console.log(this.editionEquipe);
      this.equipeService.createEquipe(this.editionEquipe);
    } else {
      this.equipeService.updateEquipe(this.editionEquipe);
    }
  }

  ajouter(selected: Joueur[]) {
    for (let i = 0; i < selected.length; i ++) {
      this.joueurEquipe.push(selected[i]);
      this.joueurAdulte.splice(this.joueurAdulte.indexOf(selected[i]), 1);
      this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
      this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
      this.editionEquipe.joueurs.push(selected[i]);
    }
  }

  enlever(selected: Joueur[]) {
    for (let i = 0; i < selected.length; i ++) {
      this.joueurEquipe.splice(this.joueurEquipe.indexOf(selected[i]), 1);
      this.joueurAdulte.push(selected[i]);
      this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
      this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
      this.editionEquipe.joueurs.splice(this.editionEquipe.joueurs.indexOf(selected[i]), 1);
    }
  }
}
