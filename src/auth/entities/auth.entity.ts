import {User as UserModel} from "@prisma/client";

export class AuthEntity implements UserModel{
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
