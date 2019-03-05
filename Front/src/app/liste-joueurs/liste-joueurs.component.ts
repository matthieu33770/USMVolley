import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Joueur } from '../Model/Joueur';
import { Router } from '@angular/router';
import { JoueursService } from '../joueurs.service';

@Component({
  selector: 'app-liste-joueurs',
  templateUrl: './liste-joueurs.component.html',
  styleUrls: ['./liste-joueurs.component.css']
})
export class ListeJoueursComponent implements OnInit {

  joueurList: BehaviorSubject<Joueur[]>;
  displayedColumns: string[] = ['select', 'nomJoueur', 'prenomJoueur', 'sexeJoueur', 'numeroAdresseJoueur', 'rueJoueur', 'codePostalJoueur', 'villeJoueur', 'mailJoueur', 'telephone1Joueur', 'telephone2Joueur', 'dateNaissanceJoueur', 'avoirJoueur', 'userJoueur', 'equipesJoueur'];
  dataSource = new MatTableDataSource<Joueur>();
  selection = new SelectionModel<Joueur>(false, []);

  constructor(private router: Router, private joueurService: JoueursService) { }

  ngOnInit() {
    this.joueurService.getJoueurs().subscribe(Joueurs => this.dataSource = new MatTableDataSource<Joueur>(Joueurs));
    // this.getJoueur();
    // console.log(this.getJoueur);
    // this.getJoueur();
  }

  getJoueur(): void {
    this.joueurService.getJoueurs().subscribe(Joueurs => this.dataSource = new MatTableDataSource<Joueur>(Joueurs));
  }

  onEdit(selected: Joueur[]) {
    this.router.navigate(['detailjoueur/' + selected[0].idJoueur]);
  }

  delete(selected: Joueur[]) {
    console.log(selected);
    if (selected.length !== 0) {
      console.log(this.joueurService.availableJoueur);
      this.joueurService.availableJoueur.splice(this.joueurService.availableJoueur.indexOf(selected[0]), 1);
      this.getJoueur();
      this.selection = new SelectionModel<Joueur>(false, []);
    }
  }
}
