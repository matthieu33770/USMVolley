import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { ManifestationService } from '../services/manifestation.service';

import { Manifestation } from '../modeles/manifestation';
import { EquipesService } from '../services/equipes.service';
import { Equipe } from '../modeles/equipe';
import { ParticipationService } from '../services/participation.service';
import { Participation } from '../modeles/participation';


@Component({
  selector: 'app-liste-manifestation',
  templateUrl: './liste-manifestation.component.html',
  styleUrls: ['./liste-manifestation.component.css']
})
export class ListeManifestationComponent implements OnInit, OnDestroy  {

  choix = '';
  titre: string;
  manifestations: Manifestation [] = [];
  manifestationList: Manifestation [] = [];
  dataSource = new MatTableDataSource<Manifestation>();
  displayedColumns: string[] = ['select', 'title', 'date', 'equipe', 'lieu', 'statut', 'present', 'absent', 'nonRepondu'];
  selection = new SelectionModel<Manifestation>(false, []);

  equipes: Equipe [] = [];
  nbreJoueur: number;
  nbreParticipation: number;

  participations: Participation [] = [];
  participationList: Participation [] = [];

  participationManifList: Participation [] = [];

  subManifestation: Subscription;
  subEquipe: Subscription;
  subParticipation: Subscription;

  constructor(private router: Router,
              private manifestationService: ManifestationService,
              private participationService: ParticipationService,
              private equipeService: EquipesService) { }

  ngOnInit() {
    this.subManifestation = this.manifestationService.availableManifestation$.subscribe(Manifestations => {
      this.manifestations = Manifestations;
    });
    this.getManifestation();
    // this.subParticipation = this.participationService.availableParticipation$.subscribe(Participations => {
    //   this.participations = Participations;
    // });
    // this.getParticipation();
  }

  getManifestation(): void {
    if (this.manifestations) {
      this.dataSource = new MatTableDataSource<Manifestation>(this.manifestations);
    } else {
      this.manifestationService.publishManifestations();
    }
    this.manifestationService.getManifestations().subscribe(Manifestations => {
                                                            Manifestations.forEach( manifestation => {
                                                              this.manifestationList.push(manifestation);
                                                              manifestation.nbrePasRepondu = manifestation.equipe.joueurs.length;
                                                              this.participationService.getParticipations().subscribe(Participations => {
                                                                Participations.forEach( participation => {
                                                                  if (participation.participationPK.idManifestation === manifestation.idManifestation) {
                                                                    this.participationManifList.push(participation);
                                                                    // manifestation.nbrePasRepondu = manifestation.nbrePasRepondu - this.participationManifList.length;
                                                                    this.nbreParticipation = this.participationManifList.length;
                                                                    console.log(this.nbreParticipation);
                                                                  }
                                                                });
                                                              });
                                                            });
                                                            this.dataSource = new MatTableDataSource<Manifestation>(this.manifestationList);
                                                            console.log(this.dataSource);
                                                            console.log(this.participationManifList);
    });
  }

  getParticipation(): void {
    this.participationService.getParticipations().subscribe(Participations => {
                                                            Participations.forEach( participation => {
                                                              this.participationList.push(participation);
                                                            });
                                                            console.log(this.participationList);
    });
  }

  onEdit(selected: Manifestation[]) {
    this.router.navigate(['gestion/manifestations/detailmanifestation/' + selected[0].idManifestation]);
  }

  delete(selected: Manifestation[]) {
    this.manifestationService.supprimerManifestation(selected[0].idManifestation);
  }

  ngOnDestroy() {
    if (this.subManifestation) {
      this.subManifestation.unsubscribe();
    }
  }
}
