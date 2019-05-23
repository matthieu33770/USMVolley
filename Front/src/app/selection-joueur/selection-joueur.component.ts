import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { ManifestationService } from '../services/manifestation.service';
import { ParticipationService } from '../services/participation.service';
import { JoueursService } from '../services/joueurs.service';
import { DisponibiliteService } from '../services/disponibilite.service';

import { Manifestation } from '../modeles/manifestation';
import { Equipe } from '../modeles/equipe';
import { Participation } from '../modeles/participation';
import { Joueur } from '../modeles/joueur';
import { JoueurDispo } from '../modeles/joueursDispo';
import { Disponibilite } from '../modeles/disponibilite';
import { JoueurDispoTest } from '../modeles/joueurDispoTest';

@Component({
  selector: 'app-selection-joueur',
  templateUrl: './selection-joueur.component.html',
  styleUrls: ['./selection-joueur.component.css']
})
export class SelectionJoueurComponent implements OnInit {

  idManifestation: number;
  long: number;
  editionManifestation: Manifestation = new Manifestation(0, '', new Date(), new Equipe(0, '', '', null, null), null, null);
  participationList: Participation [] = [];
  joueurList: Joueur [] = [];
  joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', new Date(), null, null, null);
  disponibiliteList: Disponibilite [] = [];
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur'];
  dataDispo = new MatTableDataSource<JoueurDispo>();
  selection = new SelectionModel<JoueurDispo>(true, []);
  joueurDispo = new JoueurDispo('', '', '');
  dispoList: JoueurDispo [] = [];
  joueurDispoList: JoueurDispo [] = [];
  joueurDispoTest = new JoueurDispoTest(0, 0, 0, 0);
  joueurDispoTestList: JoueurDispoTest [] = [];

  constructor(private route: ActivatedRoute,
              private manifestationService: ManifestationService,
              private participationService: ParticipationService,
              private joueurService: JoueursService,
              private disponibiliteService: DisponibiliteService) { }

  ngOnInit() {
    this.idManifestation = Number(this.route.snapshot.params.idManifestation);
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.editionManifestation = manifestation; });
    // this.getParticipation();
    this.getParticipation();
    console.log(this.participationList);
    console.log(this.joueurDispoList);
    console.log(this.long);
  }

  getTest() {
    this.participationService.getParticipationByManifestation(this.idManifestation).subscribe(Participations => {
      this.participationList = Participations;
      console.log(this.participationList);
    });
  }

  getParticipation() {
    this.participationService.getParticipationByManifestation(this.idManifestation).subscribe(Participations => {
      this.participationList = Participations;
      this.getDispo(this.participationList);
      // this.getJoueur(this.participationList);
    });
  }

  getDispo(participationList: Participation [] ) {
    participationList.forEach(participation => {
      this.disponibiliteService.findDisponibilite(participation.participationPK.idDisponibilite).subscribe(disponibilite => {
        const listeDispo = new JoueurDispo('', '', '');
        listeDispo.dispoJoueurDispo = disponibilite.libelleDisponibilite;
        this.dispoList.push(listeDispo);
        this.getJoueur(this.participationList, this.dispoList);
      });
    });
  }

  getJoueur(participationList: Participation [], dispoList) {
    const liste: number = participationList.length;
    console.log(liste);
    console.log(dispoList);
    console.log(participationList);
    participationList.forEach(participation => {
      console.log(participation);
      this.joueurService.findJoueur(participation.participationPK.idJoueur).subscribe(joueur => {
        console.log(joueur);
        const listeJoueurs = new JoueurDispo('', '', '');
        listeJoueurs.nomJoueurDispo = joueur.nom;
        listeJoueurs.prenomJoueurDispo = joueur.prenom;
        console.log(listeJoueurs);
        this.joueurDispoList.push(listeJoueurs);
      });
    });
    for ( let i = 0; i < liste; i++ ) {
      this.joueurDispoList[i].dispoJoueurDispo = dispoList[i].dispoJoueurDispo;
    }
  }

}
