import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { ManifestationService } from '../services/manifestation.service';
import { ParticipationService } from '../services/participation.service';
import { JoueursService } from '../services/joueurs.service';
import { DisponibiliteService } from '../services/disponibilite.service';
import { MailService } from '../services/mail.service';

import { Manifestation } from '../modeles/manifestation';
import { Equipe } from '../modeles/equipe';
import { Participation } from '../modeles/participation';
import { JoueurDispo } from '../modeles/joueursDispo';
import { Disponibilite } from '../modeles/disponibilite';
import { Joueur } from '../modeles/joueur';
import { ParticipationPK } from '../modeles/participationPK';

@Component({
  selector: 'app-selection-joueur',
  templateUrl: './selection-joueur.component.html',
  styleUrls: ['./selection-joueur.component.css']
})
export class SelectionJoueurComponent implements OnInit {

  idManifestation: number;
  editionManifestation: Manifestation = new Manifestation(0, '', '', new Date(), new Equipe(0, '', '', null, null), null, null);
  joueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', new Date(), null, null, null);
  participationList: Participation [] = [];
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'dispoJoueur'];
  dataSource = new MatTableDataSource<JoueurDispo>();
  dataSelectionne = new MatTableDataSource<JoueurDispo>();
  selection = new SelectionModel<JoueurDispo>(true, []);
  joueurDispoList: JoueurDispo [] = [];
  joueurSelectionneList: JoueurDispo [] = [];

  constructor(private route: ActivatedRoute,
              private manifestationService: ManifestationService,
              private participationService: ParticipationService,
              private joueurService: JoueursService,
              private disponibiliteService: DisponibiliteService,
              private mailService: MailService) { }

  ngOnInit() {
    this.idManifestation = Number(this.route.snapshot.params.idManifestation);
    this.disponibiliteService.publishDisponibilites();
    this.joueurService.publishJoueurs();
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.editionManifestation = manifestation; });
    this.getParticipation();
  }

  getParticipation() {
    this.participationService.getParticipationByManifestation(this.idManifestation).subscribe(Participations => {
      this.participationList = Participations;
      this.getJoueur(this.participationList);
    });
  }

  getJoueur(participationList: Participation []) {
    participationList.forEach(participation => {
      this.joueurService.findJoueur(participation.participationPK.idJoueur).subscribe(joueur => {
        const listeJoueurs = new JoueurDispo('', '', '');
        listeJoueurs.nomJoueurDispo = joueur.nom;
        listeJoueurs.prenomJoueurDispo = joueur.prenom;
        const dispo: Disponibilite = this.disponibiliteService.availableDisponibilite.find(disponibilite => disponibilite.idDisponibilite === participation.participationPK.idDisponibilite);
        listeJoueurs.dispoJoueurDispo = dispo.libelleDisponibilite;
        if (listeJoueurs.dispoJoueurDispo === 'Sélectionné(e)') {
          this.joueurSelectionneList.push(listeJoueurs);
        } else {
          this.joueurDispoList.push(listeJoueurs);
        }
        this.dataSource = new MatTableDataSource<JoueurDispo>(this.joueurDispoList);
        this.dataSelectionne = new MatTableDataSource<JoueurDispo>(this.joueurSelectionneList);
      });
    });
  }

  ajouter(selected: JoueurDispo[]) {
    for (let i = 0; i < selected.length; i ++) {
      this.joueurSelectionneList.push(selected[i]);
      this.joueurDispoList.splice(this.joueurDispoList.indexOf(selected[i]), 1);
      this.dataSource = new MatTableDataSource<JoueurDispo>(this.joueurDispoList);
      this.dataSelectionne = new MatTableDataSource<JoueurDispo>(this.joueurSelectionneList);
    }
  }

  enlever(selected: JoueurDispo[]) {
    for (let i = 0; i < selected.length; i ++) {
      this.joueurSelectionneList.splice(this.joueurSelectionneList.indexOf(selected[i]), 1);
      this.joueurDispoList.push(selected[i]);
      this.dataSource = new MatTableDataSource<JoueurDispo>(this.joueurDispoList);
      this.dataSelectionne = new MatTableDataSource<JoueurDispo>(this.joueurSelectionneList);
    }
  }

  onSave() {
    const idSelectionne = 4;
    console.log(this.joueurSelectionneList);
    console.log(this.joueurSelectionneList.length);
    for (let i = 0; i < this.joueurSelectionneList.length; i++) {
      const newParticipation: ParticipationPK = new ParticipationPK(0, 0, 0);
      const dispo: Disponibilite = this.disponibiliteService.availableDisponibilite.find(disponibilite => disponibilite.libelleDisponibilite === this.joueurSelectionneList[0].dispoJoueurDispo);
      this.joueur = this.joueurService.availableJoueur.find(joueur => joueur.nom === this.joueurSelectionneList[0].nomJoueurDispo);
      newParticipation.idManifestation = this.idManifestation;
      newParticipation.idDisponibilite = idSelectionne;
      newParticipation.idJoueur = this.joueur.idJoueur;
      this.participationService.createParticipation(newParticipation);
      this.participationService.supprimerParticipation(this.idManifestation, newParticipation.idJoueur, dispo.idDisponibilite);
      this.mailService.sendMailSelectionne(this.joueur.idJoueur, this.idManifestation);
    }
  }
}
