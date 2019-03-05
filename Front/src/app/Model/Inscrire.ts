import { Joueur } from './Joueur';
import { Manifestation } from './Manifestation';

export class Inscrire {

    constructor(public idInscrire: number,
                public disponibleInscrire: String,
                public isSelectionneInscrire: Boolean,
                public joueurInscrire: Joueur,
                public manifestationInscrire: Manifestation,
    ) {}
}
