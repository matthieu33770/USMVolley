import { Licence } from './Licence';

export class Avoir {

    constructor (public idAvoir: number,
                 public anneeAvoir: number,
                 public isValideAvoir: Boolean,
                 public licenceAvoir: Licence,
    ) {}
}
