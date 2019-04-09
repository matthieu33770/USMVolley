import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { LoginService } from '../Services/login.service';
import { JoueursService } from '../Services/joueurs.service';
import { UsersService } from '../Services/users.service';
import { Joueur } from '../Model/Joueur';
import { User } from '../model/User';
import { DatePipe } from '@angular/common';
import { CategorieService } from '../Services/categorie.service';
import { Categorie } from '../Model/Categorie';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-saisie',
  templateUrl: './saisie.component.html',
  styleUrls: ['./saisie.component.css']
})
export class SaisieComponent implements OnInit {

  // permet de conserver le role pour l'utiliser dans les guards
  userRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  isLoggedin = false;
  username: String;
  user;
  formulaire: string;
  certificat: string;
  editionUser: User = new User(0, '', '', false, ['ROLE_LICENCIE'], null);
  editionJoueur: Joueur = new Joueur(null, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  userList: BehaviorSubject<User[]>;
  player: Joueur [] = [];
  categorie: Categorie [] = [];
  idCat: number;
  categorieList: any = [];
  public age: number;
  public dateNaissance: Date;

  public uploaderFormulaire: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});
  public uploaderCertificat: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});

  constructor(private loginService: LoginService,
              private joueurService: JoueursService,
              private userService: UsersService,
              private categorieService: CategorieService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.loginService.userRole.subscribe(userRole => {
      this.isLoggedin = userRole.length > 0;
      console.log(this.isLoggedin);
    });

    this.username = jwt_decode(sessionStorage.getItem(environment.accessToken)).sub;
    console.log(this.username);
    this.getUser();
    this.userService.findByUsername(this.username).subscribe(user => {
      this.editionUser = user; });
    this.getJoueur();
    console.log(this.player);
    console.log(this.editionJoueur);
    this.getCategories();

    this.uploaderFormulaire.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploaderFormulaire.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
     };
    this.uploaderCertificat.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderCertificat.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
     };
  }

  getUser(): void {
    this.userService.getUsers().subscribe(Users => this.user === Users);
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(Categories => this.categorieList = Categories);
  }

  getJoueur(): void {
    this.joueurService.getJoueurs().subscribe(Joueurs => {
                                              Joueurs.forEach( joueur => {
                                                if (joueur.user.username === this.username) {
                                                  this.player.push(joueur);
                                                  this.editionJoueur = this.player[0];
                                                  this.formulaire = 'Formulaire - ' + this.player[0].nom + ' ' + this.player[0].prenom;
                                                  this.certificat = 'Certificat Médical - ' + this.player[0].nom + ' ' + this.player[0].prenom;  }
                                              } );
                                             });
  }

  onSave() {
    console.log(this.username);
    console.log(this.editionJoueur);
    this.dateNaissance = this.editionJoueur.dateNaissance;
    if (this.dateNaissance) {
      const timeDiff = Math.abs(Date.now() - new Date(this.dateNaissance).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(this.age);
    }
    this.categorieList.forEach( categorie => {
      if (categorie.ageMax <= this.age) {
        this.categorie.push(categorie);
        this.idCat = this.categorie.length;
        console.log(this.categorie.length);
        console.log(this.idCat);
      }
    });
    console.log(this.idCat);
    // Vérifier si on est en édition ou en création
    if (this.username) {
      this.editionJoueur.user.roleList = ['ROLE_LICENCIE'];
      console.log(this.editionJoueur.user.roleList);
      this.editionJoueur.avoir.licence.categories = this.categorieList[this.idCat];
      console.log(this.editionJoueur.avoir.licence.categories);
      console.log(this.editionJoueur);
      // this.joueurService.createJoueur(this.editionJoueur);
    } else {
      // this.joueurService.updateJoueur(this.editionJoueur);
    }
  }
}
