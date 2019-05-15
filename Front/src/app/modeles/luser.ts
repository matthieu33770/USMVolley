import { Fonction } from './Fonction';

export class User {

    constructor(public idUser: number,
                public username: String,
                public mdp: String,
                public fonction: Fonction,
        ) {}
}
