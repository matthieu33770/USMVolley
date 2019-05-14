import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../Model/User';
import { Fonction } from '../Model/Fonction';
import { Equipe } from '../Model/Equipe';
import { Joueur } from '../Model/Joueur';

import { JoueursService } from '../Services/joueurs.service';
import { EquipesService } from '../Services/equipes.service';

@Component({
  selector: 'app-detail-joueur',
  templateUrl: './detail-joueur.component.html',
  styleUrls: ['./detail-joueur.component.css']
})
export class DetailJoueurComponent implements OnInit {

  ismodification: Boolean = false;
  idJoueur: number;
  idFonction: number;
  idEquipe: number;
  users: User [] = [];
  userList: User [];
  // roles: Role [] = [];
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
    // console.log();
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
