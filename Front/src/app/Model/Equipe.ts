import { Joueur } from './Joueur';

export class Equipe {

    nbreHomme: number;
    nbreFemme: number;

    constructor(public idEquipe: number,
                public libelleEquipe: String,
                public joueurs: Joueur [],
    ) {}
}
