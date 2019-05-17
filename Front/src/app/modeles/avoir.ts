import { Licence } from './licence';

export class Avoir {

    constructor (public idAvoir: number,
                 public anneeAvoir: number,
                 public isValide: Boolean,
                 public licence: Licence,
    ) {}
}
