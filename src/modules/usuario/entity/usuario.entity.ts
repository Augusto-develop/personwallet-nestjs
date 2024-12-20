export class Usuario {
    id: string;
    name: string;
    email: string;
    emailVerifiedAt: Date | null;
    password: string;
    rememberToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}