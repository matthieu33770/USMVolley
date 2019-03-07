import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { User } from '../Model/User';
import { Role } from '../Model/Role';
import { Fonction } from '../Model/Fonction';
import { Equipe } from '../Model/Equipe';

import { JoueursService } from '../Services/joueurs.service';
import { EquipesService } from '../Services/equipes.service';
import { Joueur } from '../Model/Joueur';

@Component({
  selector: 'app-detail-joueur',
  templateUrl: './detail-joueur.component.html',
  styleUrls: ['./detail-joueur.component.css']
})
export class DetailJoueurComponent implements OnInit {

  idJoueur: number;
  idFonction: number;
  idEquipe: number;
  users: User [] = [];
  userList: User [];
  roles: Role [] = [];
  fonctions: Fonction [] = [];
  fonctionList: Fonction [];
  equipes: Equipe [] = [];
  equipe: Equipe;
  // joueurForm: FormGroup;
  editionJoueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);

  constructor(private route: ActivatedRoute,
              private joueurService: JoueursService,
              private equipeService: EquipesService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.idJoueur = Number(this.route.snapshot.params.idJoueur);
    this.idFonction = +this.route.snapshot.params.idFonction;
    this.idEquipe = +this.route.snapshot.params.idEquipe;
    this.getFonction();
    this.getEquipe();
    this.joueurService.findJoueur(this.idJoueur).subscribe(joueur => {
      this.editionJoueur = joueur;
    });
    // this.joueurForm = this.formBuilder.group({

    // });
  }

  getFonction(): void {
    this.joueurService.getFonctions().subscribe(Fonctions => this.fonctions = Fonctions);
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipes = Equipes);
  }

  getEquipeByName(libelleEquipe: string) {
    this.equipeService.getEquipeByName(libelleEquipe).subscribe(equipe => this.equipe = equipe);
  }

  // getEquipesControl() {
  //   return this.joueurForm.get('equipes') as FormArray;
  // }

  // onAddEquipe() {
  //   const newEquipeControl = this.formBuilder.control('', Validators.required);
  //   this.getEquipesControl().push(newEquipeControl);
  // }

}
