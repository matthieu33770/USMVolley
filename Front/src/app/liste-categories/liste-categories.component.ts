import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
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
export class ListeCategoriesComponent implements OnInit, OnDestroy {

  idCategorie: number;
  categorieList: BehaviorSubject<Categorie[]>;
  categories: Categorie [] = [];
  displayedColumns: string[] = ['select', 'categorie', 'ageMax'];
  dataSource = new MatTableDataSource<Categorie>();
  selection = new SelectionModel<Categorie>(false, []);
  teams: any = [];

  subCategorie: Subscription;

  constructor(private router: Router, private categorieService: CategorieService, private excelService: ExcelService) { }

  ngOnInit() {
    this.subCategorie = this.categorieService.availableCategorie$.subscribe(Categories => {
      this.categories = Categories;
      this.getCategorie();
    });
    // this.categorieService.publishCategories();
    // this.categorieList = this.categorieService.availableCategorie$;
    // this.categorieService.getCategories().subscribe(Categories => {this.dataSource = new MatTableDataSource<Categorie>(Categories); });
  }

  getCategorie(): void {
    if (this.categories) {
      this.dataSource = new MatTableDataSource<Categorie>(this.categories);
    } else {
      this.categorieService.publishCategories();
    }
  }

  onEdit(selected: Categorie[]) {
    this.router.navigate(['gestion/categories/detailcategorie/' + selected[0].idCategorie]);
  }

  delete(selected: Categorie[]) {
    console.log(selected);
    if (selected.length !== 0) {
      this.categorieService.supprimerCategorie(selected[0].idCategorie);
      // this.categorieService.availableCategorie.splice(this.categorieService.availableCategorie.indexOf(selected[0]), 1);
      // this.selection = new SelectionModel<Categorie>(false, []);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.teams, 'Export');
  }

  ngOnDestroy() {
    if (this.subCategorie) {
      this.subCategorie.unsubscribe();
    }
  }
}
