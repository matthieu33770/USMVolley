import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Categorie } from '../Model/Categorie';

import { CategorieService } from '../Services/categorie.service';
import { ExcelService } from '../Services/excel.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styleUrls: ['./liste-categories.component.css']
})
export class ListeCategoriesComponent implements OnInit {

  idCategorie: number;
  categorieList: BehaviorSubject<Categorie[]>;
  categories: Categorie [] = [];
  displayedColumns: string[] = ['select', 'categorie', 'ageMax'];
  dataSource = new MatTableDataSource<Categorie>();
  selection = new SelectionModel<Categorie>(false, []);
  teams: any = [];

  constructor(private router: Router, private categorieService: CategorieService, private excelService: ExcelService) { }

  ngOnInit() {
    this.categorieService.publishCategories();
    this.categorieList = this.categorieService.availableCategorie$;
    this.categorieService.getCategories().subscribe(Categories => {this.dataSource = new MatTableDataSource<Categorie>(Categories); });
  }

  onEdit(selected: Categorie[]) {
    this.router.navigate(['gestion/categories/detailcategorie/' + selected[0].idCategorie]);
  }

  delete(selected: Categorie[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.categorieService.supprimerCategorie(selected[0].idCategorie);
      this.categorieService.availableCategorie.splice(this.categorieService.availableCategorie.indexOf(selected[0]), 1);
      this.selection = new SelectionModel<Categorie>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }
}
