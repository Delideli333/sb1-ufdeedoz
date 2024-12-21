export class Validators {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPassword(password: string): boolean {
        return password.length >= 8;
    }

    static isValidPrompt(prompt: string): boolean {
        return prompt.length >= 10 && prompt.length <= 500;
    }
}