import { StorageUtil } from '../../utils/storage';
import { Validators } from '../../utils/validators';
import { ErrorHandler } from '../../utils/error-handler';
import { LoginCredentials, AuthToken, AuthError } from './auth.types';

export class AuthService {
    private static readonly AUTH_TOKEN_KEY = 'authToken';

    async login(credentials: LoginCredentials): Promise<boolean> {
        if (!Validators.isValidEmail(credentials.email)) {
            throw new Error('Invalid email format');
        }

        if (!Validators.isValidPassword(credentials.password)) {
            throw new Error('Invalid password format');
        }

        return await ErrorHandler.wrapAsync(async () => {
            // Implement actual authentication here
            const token: AuthToken = {
                token: 'dummy-token',
                expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            };
            
            await StorageUtil.saveSecure(
                AuthService.AUTH_TOKEN_KEY, 
                JSON.stringify(token)
            );
            return true;
        }, 'AuthService.login') ?? false;
    }

    async logout(): Promise<void> {
        await StorageUtil.removeSecure(AuthService.AUTH_TOKEN_KEY);
    }

    async isAuthenticated(): Promise<boolean> {
        const tokenData = await StorageUtil.getSecure(AuthService.AUTH_TOKEN_KEY);
        if (!tokenData) return false;

        const token: AuthToken = JSON.parse(tokenData);
        return token.expiresAt > Date.now();
    }
}