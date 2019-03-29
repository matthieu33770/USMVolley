import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ExcelService } from '../Services/excel.service';

import { Equipe } from '../Model/Equipe';
import { Joueur } from '../Model/Joueur';

import { EquipesService } from '../Services/equipes.service';
import { JoueursService } from '../Services/joueurs.service';

@Component({
  selector: 'app-detail-equipe',
  templateUrl: './detail-equipe.component.html',
  styleUrls: ['./detail-equipe.component.css']
})

export class DetailEquipeComponent implements OnInit {

  idEquipe: number;
  equipe;
  equipeList: Equipe [];
  joueurAdulte: Joueur [] = [];
  joueurEquipe: Joueur[] = [];
  editionEquipe: Equipe = new Equipe(0, '', null);
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'licenceJoueur'];
  dataEquipe = new MatTableDataSource<Joueur>();
  dataAdulte = new MatTableDataSource<Joueur>();
  selection = new SelectionModel<Joueur>(false, []);

  constructor(private route: ActivatedRoute,
              private equipeService: EquipesService,
              private joueurService: JoueursService,
              private router: Router,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.idEquipe = +this.route.snapshot.params.idEquipe;
    this.getEquipe();
    this.equipeService.findEquipe(this.idEquipe).subscribe(equipe => {
      this.editionEquipe = equipe; });
    this.getAdulte();
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipe = Equipes);
  }

  getAdulte(): void {
    this.joueurService.getJoueurs().subscribe(Joueurs => {
                                              Joueurs.forEach( joueur => {
                                              if (joueur.avoir.licence.categories.libelleCategorie === 'Adultes') {
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
    this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
    this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.joueurEquipe, 'Export');
  }

  modifier() {
    this.equipeService.updateEquipe(this.editionEquipe);
  }

  ajouter(selected: Joueur) {
    this.joueurEquipe.push(selected[0]);
    this.joueurAdulte.splice(this.joueurAdulte.indexOf(selected[0]), 1);
    this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
    this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
  }

  enlever(selected: Joueur[]) {
    this.joueurEquipe.splice(this.joueurEquipe.indexOf(selected[0]), 1);
    this.joueurAdulte.push(selected[0]);
    this.dataAdulte = new MatTableDataSource<Joueur>(this.joueurAdulte);
    this.dataEquipe = new MatTableDataSource<Joueur>(this.joueurEquipe);
  }
}
