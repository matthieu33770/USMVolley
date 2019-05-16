import { Equipe } from './Equipe';
import { Lieu } from './Lieu';
import { Statut } from './Statut';
import { Horaire } from './Horaire';
import { Creneau } from './Creneau';
import { Time } from '@angular/common';

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
