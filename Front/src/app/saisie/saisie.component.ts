import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { FileInformation } from '../file-information';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { LoginService } from '../services/login.service';
import { JoueursService } from '../services/joueurs.service';
import { UsersService } from '../services/users.service';
import { CategorieService } from '../services/categorie.service';

import { Joueur } from '../modeles/joueur';
import { User } from '../modeles/user';
import { Categorie } from '../modeles/categorie';
import { Licence } from '../modeles/licence';
import { Avoir } from '../modeles/avoir';
import { Fonction } from '../modeles/fonction';

@Component({
  selector: 'app-saisie',
  templateUrl: './saisie.component.html',
  styleUrls: ['./saisie.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr'},
              {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
              {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}]
})
export class SaisieComponent implements OnInit {

  // permet de conserver le role pour l'utiliser dans les guards
  userRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  isLoggedin = false;
  isFormulaire = false;
  isCertificat = false;
  username: String;
  user;
  formulaire: string;
  certificat: string;
  editionUser: User = new User(0, '', '', new Fonction(1, 'Licencie'));
  editionLicence: Licence = new Licence(0, '', 0, '', '', null);
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
  age: number;
  dateNaissance: Date;
  dateAnnee: Date;
  annee: number;
  dateCalculAge: Date;
  joueurForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  formulaireTest: string;
  certificatTest: string;

  public payPalConfig ?: IPayPalConfig;

  @ViewChild('fileInputF')
  fileInputF: ElementRef;

  @ViewChild('fileInputC')
  fileInputC: ElementRef;

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
    this.initConfig(); //Fonction Paypal
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
    this.dateAnnee = new Date(Date.now());
    this.annee = this.dateAnnee.getFullYear();
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
                                                  this.certificat = this.player[0].nom + ' ' + this.player[0].prenom + ' - ' + this.annee + ' - Certificat.pdf';
                                                }
                                                this.joueur.push(joueur);
                                                });
                                              });
  }

  onSave() {
    this.dateNaissance = this.editionJoueur.dateNaissance;
    this.dateCalculAge = new Date(this.annee, 12, 31);
    if (this.dateNaissance) {
      const timeDiff = Math.abs(new Date(this.dateCalculAge).getTime() - new Date(this.dateNaissance).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    this.categorie = [];
    this.categorieList.forEach( categorie => {
      if (categorie.ageMax < this.age) {
        this.categorie.push(categorie);
        console.log(this.categorie);
      }
      this.idCat = this.categorie.length;
    });
    this.editionAvoir.anneeAvoir = this.annee;
    console.log(this.idCat);
    // Vérifier si on est en édition ou en création
    if (!this.username) {
      this.idJoueur = null;
      this.formulaire = this.editionJoueur.nom + ' ' + this.editionJoueur.prenom + ' - Formulaire.pdf';
      this.certificat = this.editionJoueur.nom + ' ' + this.editionJoueur.prenom + ' - ' + this.annee + ' - Certificat.pdf';
      this.editionLicence.categories = this.categorieList[this.idCat];
      this.editionAvoir.licence = this.editionLicence;
      this.editionJoueur.avoir = this.editionAvoir;
      this.editionJoueur.user = this.editionUser;
      if (this.isFormulaire) {
        this.onRegisterF();
        this.editionJoueur.avoir.licence.formulaire = this.formulaire;
      }
      if (this.isCertificat) {
        this.onRegisterC();
        this.editionJoueur.avoir.licence.certificatMedical = this.certificat;
      }
      this.joueursService.createJoueur(this.editionJoueur);
      console.log(this.editionJoueur);
    } else {
      console.log('UPADATEEEEEEEEE');
      this.editionAvoir.licence = this.editionLicence;
      this.editionJoueur.avoir = this.editionAvoir;
      this.editionJoueur.user = this.editionUser;
      if (this.isFormulaire) {
        this.onRegisterF();
        this.editionJoueur.avoir.licence.formulaire = this.formulaire;
      }
      if (this.isCertificat) {
        this.onRegisterC();
        this.editionJoueur.avoir.licence.certificatMedical = this.certificat;
      }
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
      this.isFormulaire = true;
    }
  }

  onSelectCertificat(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.joueurForm.get('certificatTest').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
      this.isCertificat = true;
    }
  }

  selectFormulaire(): void {
    this.fileInputF.nativeElement.click();
  }

  selectCertificat(): void {
    this.fileInputC.nativeElement.click();
  }

  onRegisterF() {
    const dataF: FormData = new FormData();

    if (this.file !== undefined) {
      this.formulaireTest = this.formulaire;
      dataF.append('data', this.file, this.formulaire);
      this.joueursService.addDocument(dataF);
    }
  }

  onRegisterC() {
    const dataC: FormData = new FormData();

    if (this.file !== undefined) {
      this.certificatTest = this.certificat;
      dataC.append('data', this.file, this.certificat);
      this.joueursService.addDocument(dataC);
    }
  }

private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',   // ID Marchand du compte PayPal PRO 7J7WYEZGY648W
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '90.00',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '90.00'
                        }
                    }
                },
                items: [{
                    name: 'USM Volley Ball - Licence',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '90.00',
                    },
                }]
            }]
        },
        advanced: {
            // updateOrderDetails: {
            //     commit: true
            // }
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: () => {
            console.log('onClick');
        },
    };
    console.log(this.payPalConfig);
  }
}
