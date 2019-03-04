import { Agenda } from './Agenda';
import { Manifestation } from './Manifestation';

export class Posseder {

    constructor(public idPosseder: number,
                public saisonPosseder: String,
                public agendaPosseder: Agenda,
                public manifestationPosseder: Manifestation,
        ) {}
}
