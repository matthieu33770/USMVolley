import { Fonction } from './fonction';

export class User {

    constructor(public idUser: number,
                public username: String,
                public mdp: String,
                public fonction: Fonction,
        ) {}
}
