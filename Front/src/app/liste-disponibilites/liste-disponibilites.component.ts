import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Disponibilite } from '../Model/Disponibilite';

import { DisponibiliteService } from '../Services/disponibilite.service';
import { ExcelService } from '../Services/excel.service';

@Component({
  selector: 'app-liste-disponibilites',
  templateUrl: './liste-disponibilites.component.html',
  styleUrls: ['./liste-disponibilites.component.css']
})
export class ListeDisponibilitesComponent implements OnInit, OnDestroy {

  idDisponibilite: number;
  disponibiliteList: BehaviorSubject<Disponibilite[]>;
  disponibilites: Disponibilite [] = [];
  displayedColumns: string[] = ['select', 'libelleDisponibilite', 'nbrePersonne'];
  dataSource = new MatTableDataSource<Disponibilite>();
  selection = new SelectionModel<Disponibilite>(false, []);
  teams: any = [];

  subDisponibilite: Subscription;

  constructor(private router: Router, private disponibiliteService: DisponibiliteService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subDisponibilite = this.disponibiliteService.availableDisponibilite$.subscribe(Disponibilites => {
      this.disponibilites = Disponibilites;
      this.getDisponibilite();
    });
  }

  getDisponibilite(): void {
    if (this.disponibilites) {
      this.dataSource = new MatTableDataSource<Disponibilite>(this.disponibilites);
    } else {
      this.disponibiliteService.publishDisponibilites();
    }
  }

  onEdit(selected: Disponibilite[]) {
    this.router.navigate(['gestion/disponibilites/detaildisponibilite/' + selected[0].idDisponibilite]);
  }

  delete(selected: Disponibilite[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.disponibiliteService.supprimerDisponibilite(selected[0].idDisponibilite);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subDisponibilite) {
      this.subDisponibilite.unsubscribe();
    }
  }
}
