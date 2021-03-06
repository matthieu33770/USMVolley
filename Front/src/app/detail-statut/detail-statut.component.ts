import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Statut } from '../modeles/statut';

import { StatutService } from '../services/statut.service';


@Component({
  selector: 'app-detail-statut',
  templateUrl: './detail-statut.component.html',
  styleUrls: ['./detail-statut.component.css']
})
export class DetailStatutComponent implements OnInit {

  isModification: Boolean = false;
  titre: String;
  idStatut: number;
  statuts: Statut [] = [];
  statutList: Statut [];
  editionStatut: Statut = new Statut(0, '');

  constructor(private route: ActivatedRoute,
              private statutService: StatutService,
              private router: Router) { }

  ngOnInit() {
    this.idStatut = Number(this.route.snapshot.params.idStatut);
    this.getStatut();
    this.statutService.findStatut(this.idStatut).subscribe(statut => {
      this.editionStatut = statut; });
    console.log(this.idStatut);
    console.log(this.isModification);
    if (this.idStatut) {
      this.isModification = true;
    }
  }

  getStatut(): void {
    this.statutService.getStatuts().subscribe(Statuts => this.statutList = Statuts);
  }

  onSave() {
    // Vérifier si on est en édition ou en création
    if (this.editionStatut.idStatut === 0) {
      this.statutService.createStatut(this.editionStatut);
    } else {
    console.log(this.editionStatut);
    this.statutService.updateStatut(this.editionStatut);
    }
  }
}
