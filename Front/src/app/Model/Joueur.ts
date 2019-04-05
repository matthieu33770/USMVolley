import { Avoir } from './Avoir';
import { User } from './User';
import { Equipe } from './Equipe';

export class Joueur {

    constructor(public idJoueur: number,
                public nomJoueur: String,
                public prenomJoueur: String,
                public sexe: String,
                public numeroAdresseJoueur: number,
                public rueJoueur: String,
                public codePostalJoueur: number,
                public villeJoueur: String,
                public mailJoueur: String,
                public telephone1Joueur: String,
                public telephone2Joueur: String,
                public dateNaissance: Date,
                public avoir: Avoir,
                public user: User,
                public equipes: Equipe [],
    ) {}
}
