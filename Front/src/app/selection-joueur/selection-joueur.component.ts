import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { ManifestationService } from '../services/manifestation.service';
import { ParticipationService } from '../services/participation.service';
import { JoueursService } from '../services/joueurs.service';

import { Manifestation } from '../modeles/manifestation';
import { Equipe } from '../modeles/equipe';
import { Participation } from '../modeles/participation';
import { Joueur } from '../modeles/joueur';

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
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'licenceJoueur'];
  dataDispo = new MatTableDataSource<Joueur>();
  selection = new SelectionModel<Joueur>(true, []);

  constructor(private route: ActivatedRoute,
              private manifestationService: ManifestationService,
              private participationService: ParticipationService,
              private joueurService: JoueursService) { }

  ngOnInit() {
    this.idManifestation = Number(this.route.snapshot.params.idManifestation);
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.editionManifestation = manifestation; });
    this.getParticipation();
  }

  getParticipation() {
    this.participationService.getParticipations().subscribe(Participations => {
      Participations.forEach( participation => {
        // if (participation.participationPK.idManifestation === this.idManifestation) {
        //   this.participationList.push(participation);
        // }
        this.joueurService.getJoueurs().subscribe(Joueurs => {
          Joueurs.forEach( joueur => {
            if (joueur.idJoueur === participation.participationPK.idJoueur && this.idManifestation === participation.participationPK.idManifestation) {
              this.joueurList.push(joueur);
            }
          });
        });
      });
    });
    this.dataDispo = new MatTableDataSource<Joueur>(this.joueurList);
    console.log(this.participationList);
    console.log(this.joueurList);
  }
}
