import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { EquipesService } from '../Services/equipes.service';
import { ExcelService } from '../Services/excel.service';

import { Equipe } from '../Model/Equipe';

@Component({
  selector: 'app-liste-equipes',
  templateUrl: './liste-equipes.component.html',
  styleUrls: ['./liste-equipes.component.css']
})
export class ListeEquipesComponent implements OnInit {

  idEquipe: number;
  nbreMasculin;
  nbreFeminin;
  test;
  equipe: Equipe;
  equipes: Equipe [] = [];
  equipeList: BehaviorSubject<Equipe[]>;
  displayedColumns: string[] = ['select', 'libelleEquipe', 'nombreJoueur', 'nombreGarçons', 'nombreFilles'];
  dataSource = new MatTableDataSource<Equipe>();
  selection = new SelectionModel<Equipe>(false, []);
  teams: any = [];

  constructor(private router: Router, private equipeService: EquipesService, private excelService: ExcelService) { }

  ngOnInit() {
    this.equipeList = this.equipeService.availableEquipe$;
    this.getEquipe();
    this.getTeam();
    this.equipeService.getEquipes().subscribe(Equipes => {this.dataSource = new MatTableDataSource<Equipe>(Equipes);
                                              Equipes.forEach( equipe => {
                                              this.nbreMasculin = equipe.joueurs.filter(joueur => {if (joueur.sexe === 'M') { return true; }} );
                                              this.nbreFeminin = equipe.joueurs.filter(joueur => {if (joueur.sexe === 'F') { return true; }} );
                                              console.log(this.nbreMasculin, this.nbreFeminin);
                                            equipe.nbreHomme = this.nbreMasculin.length;
                                            equipe.nbreFemme = this.nbreFeminin.length; });
                                            });
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipes = Equipes);
  }

  getTeam(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.equipeService.getTeams().subscribe(Equipe => this.teams = Equipe);
  }

  onEdit(selected: Equipe[]) {
    console.log(selected[0].idEquipe);
    this.router.navigate(['gestion/equipes/detailequipe/' + selected[0].idEquipe]);
  }

  delete(selected: Equipe[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.equipeService.availableEquipe.splice(this.equipeService.availableEquipe.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Equipe>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

}
