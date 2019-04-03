import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Disponibilite } from '../Model/Disponibilite';

import { DisponibiliteService } from '../Services/disponibilite.service';

@Component({
  selector: 'app-detail-disponibilites',
  templateUrl: './detail-disponibilites.component.html',
  styleUrls: ['./detail-disponibilites.component.css']
})
export class DetailDisponibilitesComponent implements OnInit {

  isModification: Boolean = false;
  titre: String;
  idDisponibilite: number;
  disponibilites: Disponibilite [] = [];
  disponibiliteList: Disponibilite [];
  editionDisponibilite: Disponibilite = new Disponibilite(0, '');

  constructor(private route: ActivatedRoute,
              private disponibiliteService: DisponibiliteService,
              private router: Router) { }

  ngOnInit() {
    this.idDisponibilite = Number(this.route.snapshot.params.idDisponibilite);
    this.getDisponibilite();
    this.disponibiliteService.findDisponibilite(this.idDisponibilite).subscribe(disponibilite => {
      this.editionDisponibilite = disponibilite; });
    console.log(this.idDisponibilite);
    console.log(this.isModification);
    if (this.idDisponibilite) {
      this.isModification = true;
    }
  }

  getDisponibilite(): void {
    this.disponibiliteService.getDisponibilites().subscribe(Disponibilites => this.disponibiliteList = Disponibilites);
  }
}
