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
  editionManifestation: Manifestation = new Manifestation(0, '', new Date(), new Equipe(0, '', '', null, null), null, null);
  participationList: Participation [] = [];
  joueurList: Joueur [] = [];
  joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', new Date(), null, null, null);
  disponibiliteList: Disponibilite [] = [];
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur'];
  dataDispo = new MatTableDataSource<JoueurDispo>();
  selection = new SelectionModel<JoueurDispo>(true, []);
  joueurDispo = new JoueurDispo('', '', '');
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
    this.getParticipation();
  }

  getParticipation() {
    this.participationService.getParticipations().subscribe(Participations => {
      Participations.forEach( participation => {
        if (participation.participationPK.idManifestation === this.idManifestation) {
          this.participationList.push(participation);
          this.disponibiliteService.findDisponibilite(participation.participationPK.idDisponibilite).subscribe(disponibilite => {
            this.disponibiliteList.push(disponibilite);
            this.joueurDispo.dispoJoueurDispo = disponibilite.libelleDisponibilite;
            console.log(this.joueurDispo.dispoJoueurDispo);
            this.joueurService.findJoueur(participation.participationPK.idJoueur).subscribe(joueur => {
              const listeTest = new JoueurDispo('', '', '');
              this.joueurList.push(joueur);
              // this.joueurDispo.nomJoueurDispo = joueur.nom;
              listeTest.nomJoueurDispo = joueur.nom;
              console.log(joueur.nom);
              // this.joueurDispo.prenomJoueurDispo = joueur.prenom;
              listeTest.prenomJoueurDispo = joueur.prenom;
              console.log(listeTest);
              console.log(this.joueurDispo.prenomJoueurDispo);
              console.log(this.joueurDispo);
              // this.joueurDispoList.push(this.joueurDispo);
              this.joueurDispoList.push(listeTest);
              console.log(this.joueurDispoList);
            });
          });
        }
      });
    });
    console.log(this.participationList);
    console.log(this.joueurList);
    console.log(this.disponibiliteList);
    console.log(this.joueurDispoList);
  }

}
