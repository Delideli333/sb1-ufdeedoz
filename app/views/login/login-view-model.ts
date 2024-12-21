import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { ErrorHandler } from '../../utils/error-handler';
import { Validators } from '../../utils/validators';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    public email: string = "";
    public password: string = "";
    public errorMessage: string = "";

    constructor() {
        super();
        this.authService = new AuthService();
    }

    async login() {
        this.set("errorMessage", "");

        if (!Validators.isValidEmail(this.email)) {
            this.set("errorMessage", "Please enter a valid email");
            return;
        }

        if (!Validators.isValidPassword(this.password)) {
            this.set("errorMessage", "Password must be at least 8 characters");
            return;
        }

        const success = await ErrorHandler.wrapAsync(
            async () => this.authService.login({
                email: this.email,
                password: this.password
            }),
            'LoginViewModel.login'
        );

        if (success) {
            NavigationService.navigate('home');
        } else {
            this.set("errorMessage", "Login failed. Please try again.");
        }
    }

    signup() {
        NavigationService.navigate('signup');
    }
}