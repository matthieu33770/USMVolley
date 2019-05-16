import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { ManifestationService } from '../services/manifestation.service';

import { Manifestation } from '../modeles/manifestation';


@Component({
  selector: 'app-liste-manifestation',
  templateUrl: './liste-manifestation.component.html',
  styleUrls: ['./liste-manifestation.component.css']
})
export class ListeManifestationComponent implements OnInit, OnDestroy  {

  choix = '';
  titre: string;
  isChoix = false;
  manifestations: Manifestation [] = [];
  manifestationList: Manifestation [] = [];
  dataSource = new MatTableDataSource<Manifestation>();
  displayedColumns: string[] = ['select', 'title', 'date', 'equipe', 'lieu', 'statut'];
  selection = new SelectionModel<Manifestation>(false, []);

  subManifestation: Subscription;

  constructor(private router: Router,
              private manifestationService: ManifestationService) { }

  ngOnInit() {
    this.subManifestation = this.manifestationService.availableManifestation$.subscribe(Manifestations => {
      this.manifestations = Manifestations;
    });
  }

  choixFait () {
    this.isChoix = true;
    console.log(this.choix);
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
                                                            if (manifestation.title.toLowerCase() === this.choix.toLowerCase()) {
                                                              this.manifestationList.push(manifestation); }
                                                            });
                                                            this.dataSource = new MatTableDataSource<Manifestation>(this.manifestationList);
                                                            console.log(this.dataSource);
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
