import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lieu } from '../modeles/lieu';

import { LieuxService } from '../services/lieux.service';

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
              private lieuService: LieuxService) { }

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

  onSave() {
    // Vérifier si on est en édition ou en création
    if (!this.editionLieu) {
      this.idLieu = null;
      this.lieuService.createLieu(this.editionLieu);
    } else {
    console.log(this.editionLieu);
    this.lieuService.updateLieu(this.editionLieu);
    }
  }
}
