import { SecureStorage } from "@nativescript/secure-storage";

export class AuthService {
    private secureStorage: SecureStorage;

    constructor() {
        this.secureStorage = new SecureStorage();
    }

    async login(username: string, password: string): Promise<boolean> {
        try {
            // Implement your authentication logic here
            const token = "dummy-token"; // Replace with actual token
            await this.secureStorage.set({
                key: "authToken",
                value: token
            });
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    }

    async logout(): Promise<void> {
        await this.secureStorage.remove({
            key: "authToken"
        });
    }

    async isAuthenticated(): Promise<boolean> {
        try {
            const token = await this.secureStorage.get({
                key: "authToken"
            });
            return !!token;
        } catch {
            return false;
        }
    }
}