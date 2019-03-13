import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Equipe } from '../Model/Equipe';

import { EquipesService } from '../Services/equipes.service';
import { JoueursService } from '../Services/joueurs.service';
import { Joueur } from '../Model/Joueur';

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

  constructor(private route: ActivatedRoute,
              private equipeService: EquipesService,
              private joueurService: JoueursService,
              private router: Router) { }

  ngOnInit() {
    this.idEquipe = +this.route.snapshot.params.idEquipe;
    this.getEquipe();
    this.equipeService.findEquipe(this.idEquipe).subscribe(equipe => {
      this.editionEquipe = equipe; });
    this.getAdulte();
    console.log(this.joueurAdulte, this.joueurEquipe);
    console.log(this.idEquipe);
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
                                              });
  }
}
