import { Joueur } from './joueur';
import { Categorie } from './categorie';

export class Equipe {

    nbreHomme: number;
    nbreFemme: number;

    constructor(public idEquipe: number,
                public libelleEquipe: String,
                public couleur: string,
                public categorie: Categorie,
                public joueurs: Joueur [],
    ) {}
}
