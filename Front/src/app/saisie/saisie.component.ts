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
  editionUser: User = new User(0, '', '', false, [], null);
  editionJoueur: Joueur = new Joueur(null, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  userList: BehaviorSubject<User[]>;
  player: Joueur [] = [];

  public uploaderFormulaire: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});
  public uploaderCertificat: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});

  constructor(private loginService: LoginService, private joueurService: JoueursService, private userService: UsersService) {
  }

  ngOnInit() {
    if (this.loginService.loggedIn != null) {
      this.isLoggedin = this.loginService.loggedIn;
    }
    this.username = jwt_decode(sessionStorage.getItem(environment.accessToken)).sub;
    console.log(this.username);
    this.getUser();
    this.userService.findByUsername(this.username).subscribe(user => {
      this.editionUser = user; });
    this.getJoueur();
    console.log(this.player);
    console.log(this.editionJoueur);
    this.uploaderFormulaire.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploaderFormulaire.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
    this.uploaderCertificat.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderCertificat.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
  }

  getUser(): void {
    this.userService.getUsers().subscribe(Users => this.user === Users);
  }

  getJoueur(): void {
    this.joueurService.getJoueurs().subscribe(Joueurs => {
                                              Joueurs.forEach( joueur => {
                                                if (joueur.user.username === this.username) {
                                                  this.player.push(joueur);
                                                  this.editionJoueur = this.player[0]; }
                                              } );
                                             });
  }

  onSave() {
    console.log(this.username);
    console.log(this.editionJoueur);
    // Vérifier si on est en édition ou en création
    if (!this.username) {
      this.editionJoueur.user.roleList = ['ROLE_LICENCIE'];
      this.joueurService.createJoueur(this.editionJoueur);
    } else {
      this.joueurService.updateJoueur(this.editionJoueur);
    }
  }
}
