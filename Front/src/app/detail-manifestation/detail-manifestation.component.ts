import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {CalendarModule} from 'primeng/calendar';

import { Manifestation } from '../modeles/manifestation';
import { Equipe } from '../modeles/equipe';
import { Lieu } from '../modeles/lieu';
import { Statut } from '../modeles/Statut';

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
  date: Date;
  titre: String;
  idManifestation: number;
  manifestations: Manifestation [] = [];
  manifestationList: Manifestation [];
  equipeList: Equipe [];
  lieuList: Lieu [];
  statutList: Statut [];
  editionManifestation: Manifestation = new Manifestation(0, '', new Date(), new Equipe(0, '', '', null, null), null, null);

  constructor(private route: ActivatedRoute,
              private manifestationService: ManifestationService,
              private equipeService: EquipesService,
              private lieuService: LieuxService,
              private statutService: StatutService,
              private adapter: DateAdapter<any>) { }

  ngOnInit() {
    this.idManifestation = Number(this.route.snapshot.params.idManifestation);
    this.getManifestation();
    this.manifestationService.findManifestation(this.idManifestation).subscribe(manifestation => {
      this.editionManifestation = manifestation;
      this.date = new Date(this.editionManifestation.start); });
    console.log(this.idManifestation);
    console.log(this.isModification);
    if (this.idManifestation) {
      this.isModification = true;
    }
    this.getEquipe();
    this.getLieu();
    this.getStatut();
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
    console.log(this.date);
    this.editionManifestation.start = this.date;
    console.log(this.editionManifestation);

    // Vérifier si on est en édition ou en création
    if (this.editionManifestation.idManifestation === 0) {
      // this.idManifestation = null;
      this.manifestationService.createManifestation(this.editionManifestation);
    } else {
    console.log(this.editionManifestation);
    this.manifestationService.updateManifestation(this.editionManifestation);
    }
  }

}
