import { Role } from './Role';
import { Fonction } from './Fonction';

export class User {

    constructor(public idUser: number,
                public username: String,
                public mdpUser: String,
                public isValide: Boolean,
                public role: number,
                public fonctionUser: Fonction,
        ) {}
}
