import { Categorie } from './Categorie';

export class Licence {

    constructor(public idLicence: number,
                public numeroLicence: String,
                public prixLicence: number,
                public formulaireLicence: String,
                public certificatMedical: String,
                public isPayeLicence: Boolean,
                public idPaiementLicence: String,
                public montantPayeLicence: number,
                public categorieLicence: Categorie,
    ) {}
}
