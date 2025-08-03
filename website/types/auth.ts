export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
}

export interface DatabaseUser extends AuthUser {
    passwordHash: string;
    usageCount: number;
    created_at: string;
    updated_at: string;
}