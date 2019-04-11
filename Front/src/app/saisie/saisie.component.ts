import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { FileInformation } from '../file-information';
// import {  FileUploa, JoueursServiceder, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { LoginService } from '../Services/login.service';
import { JoueursService } from '../Services/joueurs.service';
import { UsersService } from '../Services/users.service';
import { Joueur } from '../Model/Joueur';
import { User } from '../model/User';
import { DatePipe } from '@angular/common';
import { CategorieService } from '../Services/categorie.service';
import { Categorie } from '../Model/Categorie';
import { Licence } from '../Model/Licence';
import { Avoir } from '../Model/Avoir';

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
  editionLicence: Licence = new Licence(0, '', 0, '', '', false, '', 0, null);
  editionAvoir: Avoir = new Avoir(0, 2099, false, null);
  editionJoueur: Joueur = new Joueur(0, '', '', '', 0, '', 0, '', '', '', '', null, null, null, null);
  userList: BehaviorSubject<User[]>;
  player: Joueur [] = [];
  categorie: Categorie [] = [];
  joueur: Joueur [] = [];
  idCat = 1;
  idJoueurExistant = 0;
  idJoueur: number;
  categorieList: any = [];
  joueurList: any = [];
  public age: number;
  public dateNaissance: Date;
  joueurForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  formulaireTest: string;
  certificatTest: string;

  @ViewChild('fileInputF')
  fileInputF: ElementRef;

  @ViewChild('fileInputC')
  fileInputC: ElementRef;

  // public uploaderFormulaire: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});
  // public uploaderCertificat: FileUploader = new FileUploader({url: URL, itemAlias: 'fichier'});

  constructor(private loginService: LoginService,
              private joueursService: JoueursService,
              private userService: UsersService,
              private categorieService: CategorieService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginService.userRole.subscribe(userRole => {
      this.isLoggedin = userRole.length > 0;
      console.log(this.isLoggedin);
    });
    this.joueursService.publishJoueurs();
    if (this.isLoggedin) {
      this.username = jwt_decode(sessionStorage.getItem(environment.accessToken)).sub;
      console.log(this.username);
      this.getUser();
      this.userService.findByUsername(this.username).subscribe(user => {
        this.editionUser = user; });
      this.getJoueur();
      console.log(this.player);
      console.log(this.editionJoueur);
    }
    this.getJoueurs();
    this.getCategories();
    this.createForm();
  }

  createForm() {
    this.joueurForm = this.formBuilder.group({
      joueurGroup: this.formBuilder.group({
        nom: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      },
      {validator: this.checkNom.bind(this)}),
      nom: '',
      prenom: '',
      taille: '',
      sexe: '',
      dateNaissance: '',
      mail: '',
      numeroAdresse: '',
      rue: '',
      codePostal: '',
      ville: '',
      telephone1: '',
      telephone2: '',
      username: '',
      mdp: '',
      formulaireTest: '',
      certificatTest: '',
      userFile: null,
    });
  }

  checkNom(group: FormGroup) {
    let nom: string;
    nom = group.get('nom').value;
    const isValid = !(this.player.find((joueur) => joueur.nom === nom));
    return isValid ? null : { checkNom: true };
  }


  getUser(): void {
    this.userService.getUsers().subscribe(Users => this.user === Users);
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(Categories => this.categorieList = Categories);
  }

  getJoueurs() {
    this.joueursService.getJoueurs().subscribe(Joueurs => {this.joueurList = Joueurs;
                                                          console.log(this.joueurList);
                                                          this.idJoueurExistant = this.joueurList[this.joueurList.length - 1].idJoueur;
                                                          console.log(this.idJoueurExistant);
                                                        });
  }

  getJoueur(): void {
    this.joueursService.getJoueurs().subscribe(Joueurs => {
                                              Joueurs.forEach( joueur => {
                                                this.joueur = [];
                                                if (joueur.user.username === this.username) {
                                                  this.player.push(joueur);
                                                  this.editionJoueur = this.player[0];
                                                  this.formulaire = this.player[0].nom + ' ' + this.player[0].prenom + ' - Formulaire.pdf';
                                                  this.certificat = this.player[0].nom + ' ' + this.player[0].prenom + ' - Certificat.pdf';
                                                }
                                                this.joueur.push(joueur);
                                                });
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
      if (categorie.ageMax < this.age) {
        this.categorie = [];
        this.categorie.push(categorie);
      }
      this.idCat = this.categorie.length;
      console.log(this.categorie.length);
      console.log(this.idCat);
    });
    console.log(this.idCat);
    // Vérifier si on est en édition ou en création
    if (!this.username) {
      // if (this.idJoueurExistant < 200) {
      //   this.idJoueur = 200;
      // } else {
      //   this.idJoueur = this.idJoueurExistant;
      // }
      // this.idJoueur = this.idJoueurExistant + 1;
      this.idJoueur = null;
      console.log(this.idJoueur);
      console.log(this.editionJoueur);
      this.editionLicence.categories = this.categorieList[this.idCat];
      // this.editionLicence.idLicence = this.idJoueur;
      // console.log(this.editionLicence.idLicence);

      // this.editionAvoir.idAvoir = this.idJoueur;
      this.editionAvoir.licence = this.editionLicence;
      // console.log(this.editionAvoir.idAvoir);

      // this.editionUser.idUser = this.idJoueur;
      // console.log(this.editionUser.idUser);

      // this.editionJoueur.idJoueur = this.idJoueur;
      this.editionJoueur.avoir = this.editionAvoir;
      this.editionJoueur.user = this.editionUser;

      console.log(this.editionJoueur);

      // this.editionJoueur.user.roleList = ['ROLE_LICENCIE'];
      console.log(this.editionJoueur.user.roleList);
      console.log(this.editionJoueur.avoir.licence.categories);
      console.log(this.editionJoueur.avoir);
      //this.onRegister();
      this.joueursService.createJoueur(this.editionJoueur);
    } else {
      this.onRegister();
      this.editionJoueur.avoir.licence.formulaire = this.formulaire;
      this.editionJoueur.avoir.licence.certificatMedical = this.certificat;
      console.log(this.editionJoueur);
      this.joueursService.updateJoueur(this.editionJoueur);
    }
  }

  onSelectFormulaire(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.joueurForm.get('formulaireTest').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  onSelectCertificat(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.joueurForm.get('certificatTest').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  selectFormulaire(): void {
    this.fileInputF.nativeElement.click();
  }

  selectCertificat(): void {
    this.fileInputC.nativeElement.click();
  }

  public onRegister() {
    const dataF: FormData = new FormData();
    const dataC: FormData = new FormData();

    if (this.file !== undefined) {
      this.formulaireTest = this.formulaire;
      dataF.append('data', this.file, this.formulaire);
      this.joueursService.addDocument(dataF);
      this.certificatTest = this.certificat;
      dataC.append('data', this.file, this.certificat);
      this.joueursService.addDocument(dataC);
    } else {
      // this.offresService.addWatchCategory(this.nameWatch, this.priceWatch, this.descriptionWatch, this.imageWatch);
    }
  }
}
