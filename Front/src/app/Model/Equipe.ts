import { Joueur } from './Joueur';
import { Categorie } from './Categorie';

export class Equipe {

    nbreHomme: number;
    nbreFemme: number;

    constructor(public idEquipe: number,
                public libelleEquipe: String,
                public categorie: Categorie,
                public joueurs: Joueur [],
    ) {}
}
