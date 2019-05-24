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
  date: string;
  auj = +new Date();
  manifestations: Manifestation [] = [];
  manifestationList: Manifestation [] = [];
  dataSource = new MatTableDataSource<Manifestation>();
  displayedColumns: string[] = ['select', 'title', 'adversaire', 'date', 'equipe', 'lieu', 'statut', 'present', 'absent', '?', 'nonRepondu'];
  selection = new SelectionModel<Manifestation>(false, []);

  equipes: Equipe [] = [];
  nbreJoueur: number;
  nbreParticipation: number;

  participations: Participation [] = [];
  participationList: Participation [] = [];

  participationManifList: Participation [] = [];

  subManifestation: Subscription;

  constructor(private router: Router,
              private manifestationService: ManifestationService,
              private participationService: ParticipationService,
              private equipeService: EquipesService) { }

  ngOnInit() {
    this.subManifestation = this.manifestationService.availableManifestation$.subscribe(Manifestations => {
      this.manifestations = Manifestations;
    });
    this.getManifestation();
  }

  getManifestation(): void {
    if (this.manifestations) {
      this.dataSource = new MatTableDataSource<Manifestation>(this.manifestations);
    } else {
      this.manifestationService.publishManifestations();
    }
    this.manifestationService.getManifestations().subscribe(Manifestations => {
                                                            Manifestations.forEach( manifestation => {
                                                              this.date = '' + manifestation.start;
                                                              const dateManif = new Date(manifestation.start);
                                                                manifestation.participation = [];
                                                                if (+dateManif > this.auj) {
                                                                  this.manifestationList.push(manifestation);
                                                                }
                                                                this.nbreJoueur = manifestation.equipe.joueurs.length;
                                                                this.participationService.getParticipations().subscribe(Participations => {
                                                                  Participations.forEach( participation => {
                                                                    if (participation.participationPK.idManifestation === manifestation.idManifestation) {
                                                                      manifestation.participation.push(participation);
                                                                      manifestation.nbrePresent = 0;
                                                                      manifestation.nbreAbsent = 0;
                                                                      manifestation.nbreNeSaitPas = 0;
                                                                      manifestation.nbrePasRepondu = 0;
                                                                      if (participation.participationPK.idDisponibilite === 1 || participation.participationPK.idDisponibilite === 2 || participation.participationPK.idDisponibilite === 7 || participation.participationPK.idDisponibilite === 8) {
                                                                        manifestation.nbrePresent = manifestation.nbrePresent + 1;
                                                                      }
                                                                      if (participation.participationPK.idDisponibilite === 8) {
                                                                        manifestation.nbrePresent = manifestation.nbrePresent + 2;
                                                                      }
                                                                      if (participation.participationPK.idDisponibilite === 3 || participation.participationPK.idDisponibilite === 5) {
                                                                        manifestation.nbreAbsent = manifestation.nbreAbsent + 1;
                                                                      }
                                                                      if (participation.participationPK.idDisponibilite === 6) {
                                                                        manifestation.nbreNeSaitPas = manifestation.nbreNeSaitPas + 1;
                                                                      }
                                                                      this.nbreParticipation = manifestation.nbrePresent + manifestation.nbreAbsent + manifestation.nbreNeSaitPas;
                                                                    }
                                                                  });
                                                                });
                                                              manifestation.nbrePasRepondu = this.nbreJoueur - this.nbreParticipation;
                                                              console.log(manifestation.participation);
                                                            });
                                                            this.dataSource = new MatTableDataSource<Manifestation>(this.manifestationList);
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

  filterMatch() {
    const filtre = 'match';
    console.log(filtre);
    this.dataSource.filter = filtre.trim().toLowerCase();
  }

  filterEnt() {
    const filtre = 'entrainement';
    console.log(filtre);
    this.dataSource.filter = filtre.trim().toLowerCase();
  }

  onEdit(selected: Manifestation[]) {
    this.router.navigate(['gestion/manifestations/detailmanifestation/' + selected[0].idManifestation]);
  }

  delete(selected: Manifestation[]) {
    this.manifestationService.supprimerManifestation(selected[0].idManifestation);
  }

  onSelection(selected: Manifestation[]) {
    this.router.navigate(['gestion/manifestations/detailmanifestation/selectionjoueurs/' + selected[0].idManifestation]);
  }

  ngOnDestroy() {
    if (this.subManifestation) {
      this.subManifestation.unsubscribe();
    }
  }
}
