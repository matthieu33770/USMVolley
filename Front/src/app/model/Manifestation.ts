import { Equipe } from './Equipe';
import { Lieu } from './Lieu';
import { Statut } from './Statut';
import { Horaire } from './Horaire';
import { Creneau } from './Creneau';

export class Manifestation {

    constructor(public idManifestation: number,
                public title: string,
                public start: Date,
                public equipe: Equipe,
                public lieu: Lieu,
                public statut: Statut,
    ) {}
}
