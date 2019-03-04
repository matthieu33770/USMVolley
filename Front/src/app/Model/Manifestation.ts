import { Equipe } from './Equipe';
import { Lieu } from './Lieu';
import { Statut } from './Statut';
import { Horaire } from './Horaire';
import { Creneau } from './Creneau';

export class Manifestation {

    constructor(public idManifestation: number,
                public libelleManifestation: String,
                public periodiciteManifestation: String,
                public equipeManifestation: Equipe,
                public lieuManifestation: Lieu,
                public statutManifestation: Statut,
                public horaireManifestation: Horaire,
                public creneauManifestation: Creneau,
    ) {}
}
