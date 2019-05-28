import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { JoueursService } from '../services/joueurs.service';
import { EquipesService } from '../services/equipes.service';
import { ManifestationService } from '../services/manifestation.service';
import { DisponibiliteService } from '../services/disponibilite.service';

import { Joueur } from '../modeles/joueur';
import { Equipe } from '../modeles/equipe';
import { Manifestation } from '../modeles/manifestation';
import { Disponibilite } from '../modeles/disponibilite';
import { ParticipationPK } from '../modeles/participationPK';

@Component({
  selector: 'app-inscription-multiple',
  templateUrl: './inscription-multiple.component.html',
  styleUrls: ['./inscription-multiple.component.css']
})
export class InscriptionMultipleComponent implements OnInit, OnDestroy {

  username: String;
  joueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  equipes: Equipe [] = [];
  manifestations: Manifestation [] = [];
  equipeJoueur: Equipe [] = [];
  date: string;
  auj = +new Date();
  manifestationList: Manifestation [] = [];
  disponibiliteList: Disponibilite [] = [];
  newParticipation: ParticipationPK = new ParticipationPK(0, 0, 0);
  dataSource = new MatTableDataSource<Manifestation>();
  displayedColumns: string[] = ['title', 'adversaire', 'date', 'equipe', 'lieu', 'statut', 'dispo'];
  selection = new SelectionModel<Manifestation>(false, []);

  subEquipe: Subscription;
  subManifestation: Subscription;

  constructor(private joueurService: JoueursService,
              private equipeService: EquipesService,
              private manifestationService: ManifestationService,
              private disponibiliteService: DisponibiliteService) { }

  ngOnInit() {
    this.username = jwt_decode(sessionStorage.getItem(environment.accessToken)).sub;
    this.joueurService.findByUsername(this.username).subscribe(joueur => {
      this.joueur = joueur;
      this.subEquipe = this.equipeService.availableEquipe$.subscribe(Equipes => {
        this.equipes = Equipes;
        this.getEquipe();
      });
      this.subManifestation = this.manifestationService.availableManifestation$.subscribe(Manifestations => {
        this.manifestations = Manifestations;
      });
      this.getManifestation();
    });
    this.getDisponibilite();
  }

  getEquipe(): void {
    if (this.equipes) {
      this.equipes.forEach( equipe => {
        equipe.joueurs.forEach( joueur => {
          if (joueur.idJoueur === this.joueur.idJoueur) {
            this.equipeJoueur.push(equipe);
          }
        });
      });
    } else {
      this.equipeService.publishEquipes();
    }
  }

  getManifestation(): void {
    if (this.manifestations) {
    } else {
      this.manifestationService.publishManifestations();
    }
    this.manifestations.forEach( manifestation => {
      this.date = '' + manifestation.start;
      const dateManif = new Date(manifestation.start);
        if (+dateManif > this.auj) {
          for ( let i = 0; i < this.equipeJoueur.length; i ++) {
            if (manifestation.equipe.idEquipe === this.equipeJoueur[i].idEquipe) {
              this.manifestationList.push(manifestation);
            }
          }
        }
      });

      this.manifestationList.sort((a: any, b: any) => {

        const left = Number(new Date(a.start));
        const right = Number(new Date(b.start));

        return this.manifestationList ? left - right : right - left;
      });

      this.dataSource = new MatTableDataSource<Manifestation>(this.manifestationList);
  }

  getDisponibilite(): void {
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilites => this.disponibiliteList = Disponibilites);
  }

  onSave() {
    this.newParticipation.idJoueur = this.joueur.idJoueur;
    for (let i = 0; i < this.manifestationList.length; i ++) {
      if (this.manifestationList[i].idDispo) {
        this.newParticipation.idManifestation = this.manifestationList[i].idManifestation;
        this.newParticipation.idDisponibilite = this.manifestationList[i].idDispo;
        this.manifestationService.createParticipation(this.newParticipation);
      }
    }
  }

  ngOnDestroy() {
    if (this.subEquipe) {
      this.subEquipe.unsubscribe();
    }
    if (this.subManifestation) {
      this.subManifestation.unsubscribe();
    }
  }

}
