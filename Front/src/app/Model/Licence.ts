import { Categorie } from './Categorie';

export class Licence {

    constructor(public idLicence: number,
                public numeroLicence: string,
                public prixLicence: number,
                public formulaire: string,
                public certificatMedical: string,
                public isPayeLicence: Boolean,
                public idPaiementLicence: string,
                public montantPayeLicence: number,
                public categories: Categorie,
    ) {}
}
