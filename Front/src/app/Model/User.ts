import { Role } from './Role';

export class User {

    constructor(public idUser: number,
                public username: String,
                public mdpUser: String,
                public isValide: Boolean,
                public role: number,
        ) {}
}
