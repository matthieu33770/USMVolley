import { Fonction } from './Fonction';

export class User {

    constructor(public idUser: number,
                public username: String,
                public mdp: String,
                public isValide: Boolean,
                public roleList: String [],
                public fonction: Fonction,
        ) {}
}
