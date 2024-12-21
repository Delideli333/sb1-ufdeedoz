import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { ContentFormViewModel } from './components/content-form';
import { ContentPreviewViewModel } from './components/content-preview';

export class HomeViewModel extends Observable {
    private authService: AuthService;
    public contentForm: ContentFormViewModel;
    public contentPreview: ContentPreviewViewModel;

    constructor() {
        super();
        this.authService = new AuthService();
        this.contentForm = new ContentFormViewModel();
        this.contentPreview = new ContentPreviewViewModel();
    }

    async generateContent() {
        if (this.contentForm.prompt && this.contentForm.selectedImage) {
            await this.contentPreview.generateContent(this.contentForm.prompt);
        }
    }

    async schedulePost() {
        // Implement post scheduling logic
    }

    async logout() {
        await this.authService.logout();
        NavigationService.navigate('login');
    }
}