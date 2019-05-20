import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { User } from '../modeles/user';
import { Fonction } from '../modeles/fonction';
import { Equipe } from '../modeles/equipe';
import { Joueur } from '../modeles/joueur';

import { JoueursService } from '../services/joueurs.service';
import { EquipesService } from '../services/equipes.service';

@Component({
  selector: 'app-detail-joueur',
  templateUrl: './detail-joueur.component.html',
  styleUrls: ['./detail-joueur.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr'},
              {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
              {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}]
})
export class DetailJoueurComponent implements OnInit {

  ismodification: Boolean = false;
  idJoueur: number;
  idFonction: number;
  idEquipe: number;
  users: User [] = [];
  userList: User [];
  fonctions: Fonction [] = [];
  fonctionList: Fonction [];
  // roleList: any = [];
  equipes: Equipe [] = [];
  equipe: Equipe;
  equipeList: Equipe [];
  editionJoueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  paye = false;

  constructor(private route: ActivatedRoute,
              private joueurService: JoueursService,
              private equipeService: EquipesService,
              private router: Router) { }

  ngOnInit() {
    this.idJoueur = Number(this.route.snapshot.params.idJoueur);
    this.getUser();
    this.getFonction();
    this.getEquipe();
    this.joueurService.findJoueur(this.idJoueur).subscribe(joueur => {
      this.editionJoueur = joueur; });
    if (this.editionJoueur.idJoueur) {
      this.ismodification = true;
    }
  }

  getFonction(): void {
    this.joueurService.getFonctions().subscribe(Fonctions => this.fonctionList = Fonctions);
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipeList = Equipes);
  }

  getUser(): void {
    this.joueurService.getUsers().subscribe(Users => this.userList = Users);
  }

  getEquipeByName(libelleEquipe: string) {
    this.equipeService.getEquipeByName(libelleEquipe).subscribe(equipe => this.equipe = equipe);
  }

  onSave() {
    console.log(this.paye);
    console.log(this.editionJoueur.avoir.licence.certificatMedical);
    console.log(this.editionJoueur.avoir.licence.formulaire);
    this.editionJoueur.avoir.licence.isPayeLicence = this.paye;
    if (!this.editionJoueur.avoir.licence.certificatMedical && !this.editionJoueur.avoir.licence.formulaire && this.editionJoueur.avoir.licence.isPayeLicence === true) {
      this.editionJoueur.avoir.isValide = true;
    } else {
      this.editionJoueur.avoir.isValide = false;
    }
    this.editionJoueur.user.fonction = this.fonctionList.find(fonction => fonction.idFonction === this.editionJoueur.user.fonction.idFonction);
    this.joueurService.updateJoueur(this.editionJoueur);
  }
}
