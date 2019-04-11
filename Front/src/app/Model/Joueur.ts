import { Avoir } from './Avoir';
import { User } from './User';
import { Equipe } from './Equipe';

export class Joueur {

    constructor(public idJoueur: number,
                public nom: string,
                public prenom: string,
                public sexe: String,
                public numeroAdresse: number,
                public rue: String,
                public codePostal: number,
                public ville: String,
                public mail: String,
                public telephone1: String,
                public telephone2: String,
                public dateNaissance: Date,
                public avoir: Avoir,
                public user: User,
                public equipes: Equipe [],
    ) {}
}
