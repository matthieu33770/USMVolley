import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { EquipesService } from '../services/equipes.service';
import { ExcelService } from '../services/excel.service';

import { Equipe } from '../modeles/equipe';

@Component({
  selector: 'app-liste-equipes',
  templateUrl: './liste-equipes.component.html',
  styleUrls: ['./liste-equipes.component.css']
})
export class ListeEquipesComponent implements OnInit, OnDestroy {

  idEquipe: number;
  nbreMasculin;
  nbreFeminin;
  test;
  equipe: Equipe;
  equipes: Equipe [] = [];
  equipeList: BehaviorSubject<Equipe[]>;
  displayedColumns: string[] = ['select', 'libelleEquipe', 'categorie', 'nombreJoueur', 'nombreGarçons', 'nombreFilles'];
  dataSource = new MatTableDataSource<Equipe>();
  selection = new SelectionModel<Equipe>(false, []);
  teams: any = [];

  subEquipe: Subscription;

  constructor(private router: Router, private equipeService: EquipesService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subEquipe = this.equipeService.availableEquipe$.subscribe(Equipes => {
      this.equipes = Equipes;
      this.getEquipe();
    });
  }

  getEquipe(): void {
    if (this.equipes) {
      this.dataSource = new MatTableDataSource<Equipe>(this.equipes);
      this.equipes.forEach( equipe => {
        this.nbreMasculin = equipe.joueurs.filter(joueur => {if (joueur.sexe === 'Masculin') { return true; }} );
        this.nbreFeminin = equipe.joueurs.filter(joueur => {if (joueur.sexe === 'Féminin') { return true; }} );
        equipe.nbreHomme = this.nbreMasculin.length;
        equipe.nbreFemme = this.nbreFeminin.length;
      });
    } else {
      this.equipeService.publishEquipes();
    }
  }

  getTeam(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.equipeService.getTeams().subscribe(Equipe => this.teams = Equipe);
  }

  onEdit(selected: Equipe[]) {
    this.router.navigate(['gestion/equipes/detailequipe/' + selected[0].idEquipe]);
  }

  delete(selected: Equipe[]) {
    console.log(selected[0]);
    this.equipeService.supprimerEquipe(selected[0].idEquipe);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subEquipe) {
      this.subEquipe.unsubscribe();
    }
  }

}
