import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Statut } from '../modeles/statut';

import { StatutService } from '../services/statut.service';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-liste-statut',
  templateUrl: './liste-statut.component.html',
  styleUrls: ['./liste-statut.component.css']
})
export class ListeStatutComponent implements OnInit, OnDestroy {

  idStatut: number;
  statutList: BehaviorSubject<Statut[]>;
  statuts: Statut [] = [];
  displayedColumns: string[] = ['select', 'libelleStatut'];
  dataSource = new MatTableDataSource<Statut>();
  selection = new SelectionModel<Statut>(false, []);
  teams: any = [];

  subStatut: Subscription;

  constructor(private router: Router, private statutService: StatutService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subStatut = this.statutService.availableStatut$.subscribe(Statuts => {
      this.statuts = Statuts;
      this.getStatut();
    });
  }

  getStatut(): void {
    if (this.statuts) {
      this.dataSource = new MatTableDataSource<Statut>(this.statuts);
    } else {
      this.statutService.publishStatuts();
    }
  }

  onEdit(selected: Statut[]) {
    this.router.navigate(['gestion/statuts/detailstatut/' + selected[0].idStatut]);
  }

  delete(selected: Statut[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.statutService.supprimerStatut(selected[0].idStatut);
      this.selection = new SelectionModel<Statut>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subStatut) {
      this.subStatut.unsubscribe();
    }
  }
}
