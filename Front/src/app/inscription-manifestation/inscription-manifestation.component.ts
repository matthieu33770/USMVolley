import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

import { ManifestationService } from '../Services/manifestation.service';
import { JoueursService } from '../Services/joueurs.service';
import { DisponibiliteService } from '../Services/disponibilite.service';

import { Manifestation } from '../model/manifestation';
import { User } from '../Model/User';
import { Fonction } from '../Model/Fonction';
import { Joueur } from '../Model/Joueur';
import { Disponibilite } from '../Model/Disponibilite';
import { ParticipationPK } from '../model/ParticipationPK';

@Component({
  selector: 'app-inscription-manifestation',
  templateUrl: './inscription-manifestation.component.html',
  styleUrls: ['./inscription-manifestation.component.css']
})
export class InscriptionManifestationComponent implements OnInit {

  idManifestation: number;
  isEntrainement = false;
  manifestationsList: Manifestation [];
  inscriptionManifestation: Manifestation = new Manifestation(0, '', new Date(), null, null, null);
  username: String;
  editionUser: User = new User(0, '', '', new Fonction(1, ''));
  joueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
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
    this.getJoueur();
    this.getDisponibilite();
  }

  getManifestation(): void {
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.inscriptionManifestation = manifestation;
      this.newParticipation.idManifestation = manifestation.idManifestation;
      if (this.inscriptionManifestation.title === 'entrainement' || this.inscriptionManifestation.title === 'Entrainement') {
        this.isEntrainement = true;
      }
     });
  }

  getJoueur(): void {
    this.username = jwt_decode(sessionStorage.getItem(environment.accessToken)).sub;
    this.joueurService.findByUsername(this.username).subscribe(joueur => {
      this.joueur = joueur;
      this.newParticipation.idJoueur = joueur.idJoueur;
    });
  }

  getDisponibilite(): void {
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilites => {
      this.disponibiliteList = Disponibilites;
    });
  }

  onSave() {
    console.log('Joueur : ' + this.newParticipation.idJoueur);
    console.log('Manifestation : ' + this.newParticipation.idManifestation);
    console.log('Dispo : ' + this.newParticipation.idDisponibilite);
    // this.newParticipation.disponibilite = this.disponibiliteList.find(disponibilite => disponibilite.idDisponibilite === this.newParticipation.disponibilite.idDisponibilite);
    // this.newParticipation.idDisponibilite = this.disponibilite.idDisponibilite;
    this.disponibilite = this.disponibiliteList.find(disponibilite => disponibilite.idDisponibilite === this.newParticipation.idDisponibilite);
    console.log('Dispo bis : ' + this.newParticipation.idDisponibilite);
    this.manifestationService.createParticipation(this.newParticipation);
  }

}
