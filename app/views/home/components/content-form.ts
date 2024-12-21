import { Observable } from '@nativescript/core';
import { MediaService } from '../../../services/media.service';

export class ContentFormViewModel extends Observable {
    private mediaService: MediaService;
    public selectedImage: string = "";
    public prompt: string = "";

    constructor() {
        super();
        this.mediaService = new MediaService();
    }

    async takePhoto() {
        try {
            const image = await this.mediaService.takePhoto();
            this.set("selectedImage", image);
        } catch (error) {
            console.error("Error taking photo:", error);
        }
    }

    async pickFromGallery() {
        try {
            const images = await this.mediaService.pickFromGallery();
            if (images.length > 0) {
                this.set("selectedImage", images[0]);
            }
        } catch (error) {
            console.error("Error picking from gallery:", error);
        }
    }
}