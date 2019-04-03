import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
export class ListeCreneauxComponent implements OnInit {

  idCreneau: number;
  creneauList: BehaviorSubject<Creneau[]>;
  creneaux: Creneau [] = [];
  displayedColumns: string[] = ['select', 'creneau', 'categorieCreneau'];
  dataSource = new MatTableDataSource<Creneau>();
  selection = new SelectionModel<Creneau>(false, []);
  teams: any = [];

  constructor(private router: Router, private creneauxService: CreneauxService, private excelService: ExcelService) { }

  ngOnInit() {
    this.creneauList = this.creneauxService.availableCreneau$;
    this.getCreneau();
    this.getCreneaux();
    this.creneauxService.getCreneaux().subscribe(Creneaux => {this.dataSource = new MatTableDataSource<Creneau>(Creneaux); });
  }

  getCreneau(): void {
    this.creneauxService.getCreneaux().subscribe(Creneaux => this.creneaux = Creneaux);
  }

  getCreneaux(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.creneauxService.getCreneaux().subscribe(Creneau => this.teams = Creneau);
  }

  onEdit(selected: Creneau[]) {
    this.router.navigate(['gestion/creneaux/detailcreneau/' + selected[0].idCreneau]);
  }

  delete(selected: Creneau[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.creneauxService.availableCreneau.splice(this.creneauxService.availableCreneau.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Creneau>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }
}