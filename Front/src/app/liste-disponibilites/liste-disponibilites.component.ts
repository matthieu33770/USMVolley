import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
export class ListeDisponibilitesComponent implements OnInit {

  idDisponibilite: number;
  disponibiliteList: BehaviorSubject<Disponibilite[]>;
  disponibilites: Disponibilite [] = [];
  displayedColumns: string[] = ['select', 'libelleDisponibilite'];
  dataSource = new MatTableDataSource<Disponibilite>();
  selection = new SelectionModel<Disponibilite>(false, []);
  teams: any = [];

  constructor(private router: Router, private disponibiliteService: DisponibiliteService, private excelService: ExcelService) { }

  ngOnInit() {
    this.disponibiliteList = this.disponibiliteService.availableDisponibilite$;
    this.getDisponibilite();
    this.getDisponibilites();
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilites => {this.dataSource = new MatTableDataSource<Disponibilite>(Disponibilites); });
  }

  getDisponibilite(): void {
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilites => this.disponibilites = Disponibilites);
  }

  getDisponibilites(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilite => this.teams = Disponibilite);
  }

  onEdit(selected: Disponibilite[]) {
    this.router.navigate(['gestion/disponibilites/detaildisponibilite/' + selected[0].idDisponibilite]);
  }

  delete(selected: Disponibilite[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.disponibiliteService.availableDisponibilite.splice(this.disponibiliteService.availableDisponibilite.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Disponibilite>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }
}
