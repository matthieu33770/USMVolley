import { Role } from './Role';

export class User {

    constructor(public idUser: number,
                public mdpUser: String,
                public username: String,
                public role: Role,
        ) {}
}
