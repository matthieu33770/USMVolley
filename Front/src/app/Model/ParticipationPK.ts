import { Joueur } from './Joueur';
import { Manifestation } from './manifestation';
import { Disponibilite } from './Disponibilite';

export class ParticipationPK {

    constructor(public joueur: Joueur,
                public manifestation: Manifestation,
                public disponibilite: Disponibilite,
                ) {}
}
