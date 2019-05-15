import { Joueur } from './Joueur';
import { Manifestation } from './manifestation';
import { Disponibilite } from './Disponibilite';

export class ParticipationPK {

    constructor(public idJoueur: number,
                public idManifestation: number,
                public idDisponibilite: number,
                ) {}
}
