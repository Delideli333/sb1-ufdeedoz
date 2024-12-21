export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthToken {
    token: string;
    expiresAt: number;
}

export interface AuthError {
    code: string;
    message: string;
}