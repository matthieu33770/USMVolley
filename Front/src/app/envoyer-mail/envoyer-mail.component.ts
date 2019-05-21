import { Component, OnInit } from '@angular/core';

import { Equipe } from '../modeles/equipe';
import { Categorie } from '../modeles/categorie';

import { EquipesService } from '../services/equipes.service';
import { CategorieService } from '../services/categorie.service';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-envoyer-mail',
  templateUrl: './envoyer-mail.component.html',
  styleUrls: ['./envoyer-mail.component.css']
})
export class EnvoyerMailComponent implements OnInit {

  categoriesList: Categorie [];
  equipesList: Equipe [];
  equipe: Equipe = new Equipe(0, '', '', null, null);
  mailEquipe: Equipe;
  sujetMail: string;
  contenuMail: string;

  constructor(private categorieService: CategorieService,
              private equipeService: EquipesService,
              private mailService: MailService) { }

  ngOnInit() {
    this.getCategories();
    this.getEquipes();
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  getEquipes(): void {
    this.equipeService.getEquipes().subscribe(equipes => this.equipesList = equipes);
  }

  envoyer() {
    console.log(this.equipe.idEquipe);
    this.mailEquipe = this.equipesList.find(equipe => this.equipe.idEquipe === equipe.idEquipe);
    console.log(this.mailEquipe.joueurs);
    console.log(this.sujetMail);
    console.log(this.contenuMail);
    this.mailEquipe.joueurs.forEach(Joueur => {
      // this.mailService.sendMailMdP();
      console.log(Joueur.user.username);
      console.log('this.mailService.sendMailEquipe(', Joueur.user.username, this.sujetMail, this.contenuMail, ')');
      this.mailService.sendMailEquipe(Joueur.user.username, this.sujetMail, this.contenuMail);
    });
  }

}
