import { Equipe } from './equipe';
import { Lieu } from './lieu';
import { Statut } from './statut';

export class Manifestation {

    nbrePresent: number;
    nbreAbsent: number;
    nbrePasRepondu: number;

    constructor(public idManifestation: number,
                public title: string,
                public start: Date,
                public equipe: Equipe,
                public lieu: Lieu,
                public statut: Statut,
    ) {}
}
