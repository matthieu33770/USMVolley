import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Manifestation } from '../modeles/manifestation';
import { Equipe } from '../modeles/equipe';
import { Lieu } from '../modeles/lieu';
import { Statut } from '../modeles/statut';

import { ManifestationService } from '../services/manifestation.service';
import { EquipesService } from '../services/equipes.service';
import { LieuxService } from '../services/lieux.service';
import { StatutService } from '../services/statut.service';

@Component({
  selector: 'app-detail-manifestation',
  templateUrl: './detail-manifestation.component.html',
  styleUrls: ['./detail-manifestation.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr'},
              {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
              {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}]
})
export class DetailManifestationComponent implements OnInit {

  isModification: Boolean = false;
  semaines = 0;
  boucle: number;
  date: Date;
  titre: String;
  idManifestation: number;
  manifestations: Manifestation [] = [];
  manifestationList: Manifestation [];
  equipeList: Equipe [];
  lieuList: Lieu [];
  statutList: Statut [];
  editionManifestation: Manifestation = new Manifestation(0, '', '', new Date(), new Equipe(0, '', '', null, null), null, null);

  constructor(private route: ActivatedRoute,
              private manifestationService: ManifestationService,
              private equipeService: EquipesService,
              private lieuService: LieuxService,
              private statutService: StatutService) { }

  ngOnInit() {
    this.idManifestation = Number(this.route.snapshot.params.idManifestation);
    this.getManifestation();
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.editionManifestation = manifestation;
      this.date = new Date(this.editionManifestation.start); });
    if (this.idManifestation) {
      this.isModification = true;
    }
    this.getEquipe();
    this.getLieu();
    this.getStatut();

    if (this.editionManifestation.equipe === null) {
      this.editionManifestation.equipe = new Equipe(0, 'Choisir', '', null, null);
    }
    if (this.editionManifestation.lieu === null) {
      this.editionManifestation.lieu = new Lieu(0, 'Choisir');
    }
    if (this.editionManifestation.statut === null) {
      this.editionManifestation.statut = new Statut(0, 'Choisir');
    }
  }

  getManifestation(): void {
    this.manifestationService.getManifestations().subscribe(Manifestations => this.manifestationList = Manifestations);
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipeList = Equipes);
  }

  getLieu(): void {
    this.lieuService.getLieux().subscribe(Lieux => this.lieuList = Lieux);
  }

  getStatut(): void {
    this.statutService.getStatuts().subscribe(Statuts => this.statutList = Statuts);
  }

  onSave() {
    this.editionManifestation.start = this.date;

    // Vérifier si on est en édition ou en création
    if (this.editionManifestation.idManifestation === 0) {
      if (this.semaines === 0) {
        this.manifestationService.createManifestation(this.editionManifestation);
      } else {
        for (this.boucle = 0; this.boucle < this.semaines; this.boucle ++) {
          this.manifestationService.createManifestation(this.editionManifestation);
          this.editionManifestation.start.setDate(this.editionManifestation.start.getDate() + 7);
          console.log('boucle : ', this.boucle);
        }
      }
    } else {
    this.manifestationService.updateManifestation(this.editionManifestation);
    }
  }

}
