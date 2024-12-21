import { Observable } from '@nativescript/core';
import { ContentGeneratorService } from '../../../services/content-generator.service';
import { environment } from '../../../config/environment';

export class ContentPreviewViewModel extends Observable {
    private contentGenerator: ContentGeneratorService;
    public generatedCaption: string = "";
    public generatedHashtags: string = "";

    constructor() {
        super();
        this.contentGenerator = new ContentGeneratorService(environment.openAiKey);
    }

    async generateContent(prompt: string) {
        try {
            const caption = await this.contentGenerator.generateCaption(prompt);
            const hashtags = await this.contentGenerator.generateHashtags(prompt);
            
            this.set("generatedCaption", caption);
            this.set("generatedHashtags", hashtags.join(" "));
        } catch (error) {
            console.error("Error generating content:", error);
        }
    }
}