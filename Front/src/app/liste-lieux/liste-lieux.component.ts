import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Lieu } from '../Model/Lieu';

import { LieuxService } from '../Services/lieux.service';
import { ExcelService } from '../Services/excel.service';

@Component({
  selector: 'app-liste-lieux',
  templateUrl: './liste-lieux.component.html',
  styleUrls: ['./liste-lieux.component.css']
})
export class ListeLieuxComponent implements OnInit {

  idLieu: number;
  lieuList: BehaviorSubject<Lieu[]>;
  lieux: Lieu [] = [];
  displayedColumns: string[] = ['select', 'lieu'];
  dataSource = new MatTableDataSource<Lieu>();
  selection = new SelectionModel<Lieu>(false, []);
  teams: any = [];

  constructor(private router: Router, private lieuService: LieuxService, private excelService: ExcelService) { }

  ngOnInit() {
    this.lieuList = this.lieuService.availableLieu$;
    this.getLieu();
    this.getLieux();
    this.lieuService.getLieux().subscribe(Lieux => {this.dataSource = new MatTableDataSource<Lieu>(Lieux); });
  }

  getLieu(): void {
    this.lieuService.getLieux().subscribe(Lieux => this.lieux = Lieux);
  }

  getLieux(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.lieuService.getLieux().subscribe(Lieu => this.teams = Lieu);
  }

  onEdit(selected: Lieu[]) {
    this.router.navigate(['gestion/lieux/detaillieu/' + selected[0].idLieu]);
  }

  delete(selected: Lieu[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.lieuService.availableLieu.splice(this.lieuService.availableLieu.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Lieu>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }
}

