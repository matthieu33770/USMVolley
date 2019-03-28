import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { JoueursService } from '../Services/joueurs.service';
import { ExcelService } from '../Services/excel.service';

import { User } from '../Model/User';
import { Role } from '../Model/Role';
import { Joueur } from '../Model/Joueur';
import { Fonction } from '../Model/Fonction';

@Component({
  selector: 'app-liste-joueurs',
  templateUrl: './liste-joueurs.component.html',
  styleUrls: ['./liste-joueurs.component.css']
})
export class ListeJoueursComponent implements OnInit {

  idJoueur: number;
  nbreMasculin: Joueur [] = [];
  nbreFeminin: Joueur [] = [];
  joueur: Joueur [] = [];
  users: User [] = [];
  roles: Role [] = [];
  fonctions: Fonction [] = [];
  players: any = [];
  joueurList: BehaviorSubject<Joueur[]>;
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'sexeJoueur', 'numeroAdresseJoueur', 'rueJoueur', 'codePostalJoueur', 'villeJoueur', 'mailJoueur', 'telephone1Joueur', 'telephone2Joueur', 'dateNaissanceJoueur', 'userJoueur', 'avoirJoueur', 'licenceValideJoueur', 'equipesJoueur'];
  dataSource = new MatTableDataSource<Joueur>();
  selection = new SelectionModel<Joueur>(false, []);

  constructor(private router: Router, private joueurService: JoueursService, private excelService: ExcelService) { }

  ngOnInit() {
    this.joueurList = this.joueurService.availableJoueur$;
    this.getUser();
    this.getRole();
    this.getFonction();
    this.getPlayer();
    this.joueurService.getJoueurs().subscribe(Joueurs => {this.dataSource = new MatTableDataSource<Joueur>(Joueurs);
                                              this.nbreMasculin = Joueurs.filter(joueur => {if (joueur.sexe === 'M') { return true; }} );
                                              this.nbreFeminin = Joueurs.filter(joueur => {if (joueur.sexe === 'F') {return true; }} );
                                              console.log(this.nbreMasculin, this.nbreFeminin); }
                                              );
  }

  getUser(): void {
    this.joueurService.getUsers().subscribe(Users => this.users = Users);
  }
  getRole(): void {
    this.joueurService.getRoles().subscribe(Roles => this.roles = Roles);
  }
  getFonction(): void {
    this.joueurService.getFonctions().subscribe(Fonctions => this.fonctions = Fonctions);
  }
  getPlayer(): void {
    this.joueurService.getPlayers().subscribe(Joueurs => this.players = Joueurs);
  }

  onEdit(selected: Joueur[]) {
    console.log(selected[0].idJoueur);
    this.router.navigate(['gestion/joueurs/detailjoueur/' + selected[0].idJoueur]);
  }

  delete(selected: Joueur[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.joueurService.availableJoueur.splice(this.joueurService.availableJoueur.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Joueur>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.players, 'Export');
  }
}
