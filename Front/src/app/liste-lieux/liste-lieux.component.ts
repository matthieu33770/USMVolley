import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Lieu } from '../modeles/lieu';

import { LieuxService } from '../services/lieux.service';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-liste-lieux',
  templateUrl: './liste-lieux.component.html',
  styleUrls: ['./liste-lieux.component.css']
})
export class ListeLieuxComponent implements OnInit, OnDestroy {

  idLieu: number;
  lieuList: BehaviorSubject<Lieu[]>;
  lieux: Lieu [] = [];
  displayedColumns: string[] = ['select', 'lieu'];
  dataSource = new MatTableDataSource<Lieu>();
  selection = new SelectionModel<Lieu>(false, []);
  teams: any = [];

  subLieu: Subscription;

  constructor(private router: Router, private lieuService: LieuxService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subLieu = this.lieuService.availableLieu$.subscribe(Lieux => {
      this.lieux = Lieux;
      this.getLieu();
    });
  }

  getLieu(): void {
    if (this.lieux) {
      this.dataSource = new MatTableDataSource<Lieu>(this.lieux);
    } else {
      this.lieuService.publishLieux();
    }
  }

  onEdit(selected: Lieu[]) {
    this.router.navigate(['gestion/lieux/detaillieu/' + selected[0].idLieu]);
  }

  delete(selected: Lieu[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.lieuService.supprimerLieu(selected[0].idLieu);
      this.selection = new SelectionModel<Lieu>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subLieu) {
      this.subLieu.unsubscribe();
    }
  }
}

