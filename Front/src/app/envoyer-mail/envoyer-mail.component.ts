import { Component, OnInit } from '@angular/core';

import { Equipe } from '../modeles/equipe';
import { Categorie } from '../modeles/categorie';

import { EquipesService } from '../services/equipes.service';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-envoyer-mail',
  templateUrl: './envoyer-mail.component.html',
  styleUrls: ['./envoyer-mail.component.css']
})
export class EnvoyerMailComponent implements OnInit {

  categoriesList: Categorie [];
  equipesList: Equipe [];

  constructor(private categorieService: CategorieService,
              private equipeService: EquipesService) { }

  ngOnInit() {
    this.getCategories();
    this.getEquipes();
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(categories => this.categoriesList = categories);
  }

  getEquipes(): void {
    this.equipeService.getEquipes().subscribe(equipes => this.equipesList = equipes);
  }

}
