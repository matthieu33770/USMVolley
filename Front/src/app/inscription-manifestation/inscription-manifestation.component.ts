import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

import { ManifestationService } from '../services/manifestation.service';
import { JoueursService } from '../services/joueurs.service';
import { DisponibiliteService } from '../services/disponibilite.service';

import { Manifestation } from '../modeles/manifestation';
import { User } from '../modeles/user';
import { Fonction } from '../modeles/fonction';
import { Joueur } from '../modeles/joueur';
import { Disponibilite } from '../modeles/disponibilite';
import { ParticipationPK } from '../modeles/participationPK';
import { Equipe } from '../modeles/equipe';

@Component({
  selector: 'app-inscription-manifestation',
  templateUrl: './inscription-manifestation.component.html',
  styleUrls: ['./inscription-manifestation.component.css']
})
export class InscriptionManifestationComponent implements OnInit {

  idManifestation: number;
  isEntrainement = false;
  isInscriptionPossible = false;
  manifestationsList: Manifestation [];
  inscriptionManifestation: Manifestation = new Manifestation(0, '', '', new Date(), null, null, null);
  username: String;
  editionUser: User = new User(0, '', '', new Fonction(1, ''));
  joueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  joueurEquipe: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  disponibiliteList: Disponibilite [];
  disponibilite: Disponibilite;
  newParticipation: ParticipationPK = new ParticipationPK(0, 0, 0);

  constructor(private route: ActivatedRoute,
              private manifestationService: ManifestationService,
              private joueurService: JoueursService,
              private disponibiliteService: DisponibiliteService) { }

  ngOnInit() {
    console.log(this.newParticipation);
    this.idManifestation = Number(this.route.snapshot.params.idManifestation);
    this.getManifestation();
    this.getDisponibilite();
  }

  getManifestation(): void {
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.inscriptionManifestation = manifestation;
      console.log(this.inscriptionManifestation);
      this.newParticipation.idManifestation = this.inscriptionManifestation.idManifestation;
      if (this.inscriptionManifestation.title === 'entrainement' || this.inscriptionManifestation.title === 'Entrainement') {
        this.isEntrainement = true;
      }
      this.username = jwt_decode(sessionStorage.getItem(environment.accessToken)).sub;
      this.joueurService.findByUsername(this.username).subscribe(joueur => {
        this.joueur = joueur;
        console.log(this.joueur);
        this.newParticipation.idJoueur = joueur.idJoueur;
        this.joueurEquipe = this.inscriptionManifestation.equipe.joueurs.find(joueur => joueur.idJoueur === this.joueur.idJoueur);
        this.isInscriptionPossible = this.joueurEquipe.idJoueur === this.joueur.idJoueur;
     });
    });
  }

  getDisponibilite(): void {
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilites => {
      this.disponibiliteList = Disponibilites;
    });
  }

  onSave() {
    this.disponibilite = this.disponibiliteList.find(disponibilite => disponibilite.idDisponibilite === this.newParticipation.idDisponibilite);
    this.manifestationService.createParticipation(this.newParticipation);
  }

}
