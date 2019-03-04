import { Joueur } from './Joueur';

export class Equipe {

    constructor(public idEquipe: number,
                public libelleEquipe: String,
                public joueursEquipe: Joueur [],
    ) {}
}
