import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Statut } from '../Model/Statut';

import { StatutService } from '../Services/statut.service';
import { ExcelService } from '../Services/excel.service';

@Component({
  selector: 'app-liste-statut',
  templateUrl: './liste-statut.component.html',
  styleUrls: ['./liste-statut.component.css']
})
export class ListeStatutComponent implements OnInit {

  idStatut: number;
  statutList: BehaviorSubject<Statut[]>;
  statuts: Statut [] = [];
  displayedColumns: string[] = ['select', 'libelleStatut'];
  dataSource = new MatTableDataSource<Statut>();
  selection = new SelectionModel<Statut>(false, []);
  teams: any = [];

  constructor(private router: Router, private statutService: StatutService, private excelService: ExcelService) { }

  ngOnInit() {
    this.statutList = this.statutService.availableStatut$;
    this.getArticle();
    this.getArticles();
    this.statutService.getStatuts().subscribe(Statuts => {this.dataSource = new MatTableDataSource<Statut>(Statuts); });
  }

  getArticle(): void {
    this.statutService.getStatuts().subscribe(Statuts => this.statuts = Statuts);
  }

  getArticles(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.statutService.getStatuts().subscribe(Article => this.teams = Article);
  }

  onEdit(selected: Statut[]) {
    this.router.navigate(['gestion/statuts/detailstatut/' + selected[0].idStatut]);
  }

  delete(selected: Statut[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.statutService.availableStatut.splice(this.statutService.availableStatut.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Statut>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }
}
