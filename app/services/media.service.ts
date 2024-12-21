import { Camera } from "@nativescript/camera";
import { ImagePicker } from "@nativescript/imagepicker";

export class MediaService {
    private camera: Camera;
    private imagePicker: ImagePicker;

    constructor() {
        this.camera = new Camera();
        this.imagePicker = new ImagePicker();
    }

    async takePhoto(): Promise<string> {
        const options = {
            width: 1920,
            height: 1080,
            keepAspectRatio: true,
            saveToGallery: true
        };

        try {
            const imageAsset = await this.camera.takePicture(options);
            return imageAsset.android || imageAsset.ios;
        } catch (error) {
            console.error("Error taking photo:", error);
            throw error;
        }
    }

    async pickFromGallery(): Promise<string[]> {
        try {
            const selection = await this.imagePicker.authorize();
            if (selection) {
                const context = this.imagePicker.create({
                    mode: "multiple"
                });
                const selection = await context.present();
                return selection.map(selected => selected.android || selected.ios);
            }
            throw new Error("Permission denied");
        } catch (error) {
            console.error("Error picking from gallery:", error);
            throw error;
        }
    }
}