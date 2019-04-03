import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Lieu } from '../Model/Lieu';

import { LieuxService } from '../Services/lieux.service';

@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.css']
})
export class DetailLieuxComponent implements OnInit {

  isModification: Boolean = false;
  titre: String;
  idLieu: number;
  lieux: Lieu [] = [];
  lieuList: Lieu [];
  editionLieu: Lieu = new Lieu(0, '');

  constructor(private route: ActivatedRoute,
              private lieuService: LieuxService,
              private router: Router) { }

  ngOnInit() {
    this.idLieu = Number(this.route.snapshot.params.idLieu);
    this.getLieu();
    this.lieuService.findLieu(this.idLieu).subscribe(lieu => {
      this.editionLieu = lieu; });
    console.log(this.idLieu);
    console.log(this.isModification);
    if (this.idLieu) {
      this.isModification = true;
    }
  }

  getLieu(): void {
    this.lieuService.getLieux().subscribe(Lieux => this.lieuList = Lieux);
  }
}