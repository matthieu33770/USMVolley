import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Creneau } from '../Model/Creneau';

import { CreneauxService } from '../Services/creneaux.service';
import { ExcelService } from '../Services/excel.service';

@Component({
  selector: 'app-liste-creneaux',
  templateUrl: './liste-creneaux.component.html',
  styleUrls: ['./liste-creneaux.component.css']
})
export class ListeCreneauxComponent implements OnInit, OnDestroy {

  idCreneau: number;
  creneauList: BehaviorSubject<Creneau[]>;
  creneaux: Creneau [] = [];
  displayedColumns: string[] = ['select', 'creneau', 'categorieCreneau'];
  dataSource = new MatTableDataSource<Creneau>();
  selection = new SelectionModel<Creneau>(false, []);
  teams: any = [];

  subCreneau: Subscription;

  constructor(private router: Router, private creneauxService: CreneauxService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subCreneau = this.creneauxService.availableCreneau$.subscribe(Creneaux => {
      this.creneaux = Creneaux;
      this.getCreneau();
    });
  }

  getCreneau(): void {
    if (this.creneaux) {
      this.dataSource = new MatTableDataSource<Creneau>(this.creneaux);
    } else {
      this.creneauxService.publishCreneaux();
    }
  }

  onEdit(selected: Creneau[]) {
    this.router.navigate(['gestion/creneaux/detailcreneau/' + selected[0].idCreneau]);
  }

  delete(selected: Creneau[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.creneauxService.supprimerCreneau(selected[0].idCreneau);
      this.selection = new SelectionModel<Creneau>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subCreneau) {
      this.subCreneau.unsubscribe();
    }
  }
}
