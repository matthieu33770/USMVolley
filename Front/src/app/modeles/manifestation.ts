import { Equipe } from './equipe';
import { Lieu } from './lieu';
import { Statut } from './statut';
import { Participation } from './participation';

export class Manifestation {

    nbrePresent: number;
    nbreAbsent: number;
    nbreNeSaitPas: number;
    nbrePasRepondu: number;
    participation: Participation[];
    idDispo: number;

    constructor(public idManifestation: number,
                public title: string,
                public adversaire: string,
                public start: Date,
                public equipe: Equipe,
                public lieu: Lieu,
                public statut: Statut,
    ) {}
}
