import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Creneau } from '../Model/Creneau';

import { CreneauxService } from '../Services/creneaux.service';

@Component({
  selector: 'app-detail-creneaux',
  templateUrl: './detail-creneaux.component.html',
  styleUrls: ['./detail-creneaux.component.css']
})
export class DetailCreneauxComponent implements OnInit {

  isModification: Boolean = false;
  titre: String;
  idCreneau: number;
  creneaux: Creneau [] = [];
  creneauList: Creneau [];
  editionCreneau: Creneau = new Creneau(0, '', null);

  constructor(private route: ActivatedRoute,
              private creneauService: CreneauxService,
              private router: Router) { }

  ngOnInit() {
    this.idCreneau = Number(this.route.snapshot.params.idCreneau);
    this.getCreneau();
    this.creneauService.findCreneau(this.idCreneau).subscribe(creneau => {
      this.editionCreneau = creneau; });
    console.log(this.idCreneau);
    console.log(this.isModification);
    if (this.idCreneau) {
      this.isModification = true;
    }
  }

  getCreneau(): void {
    this.creneauService.getCreneaux().subscribe(Creneaux => this.creneauList = Creneaux);
  }
}
