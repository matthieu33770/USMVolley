import { Categorie } from './Categorie';

export class Creneau {

    constructor(public idCreneau: number,
                public creneau: String,
                public categorie: Categorie,
    ) {}
}
