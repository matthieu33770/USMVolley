import { Categorie } from './categorie';

export class Licence {

    constructor(public idLicence: number,
                public numeroLicence: string,
                public prixLicence: number,
                public formulaire: string,
                public certificatMedical: string,
                public categories: Categorie,
    ) {}
}
