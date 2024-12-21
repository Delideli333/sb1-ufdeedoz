import { Configuration, OpenAIApi } from "openai";

export class ContentGeneratorService {
    private openai: OpenAIApi;

    constructor(apiKey: string) {
        const configuration = new Configuration({
            apiKey: apiKey
        });
        this.openai = new OpenAIApi(configuration);
    }

    async generateCaption(prompt: string): Promise<string> {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Generate a social media caption for: ${prompt}`,
                max_tokens: 100
            });
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error("Error generating caption:", error);
            throw error;
        }
    }

    async generateHashtags(content: string): Promise<string[]> {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Generate relevant hashtags for: ${content}`,
                max_tokens: 50
            });
            return response.data.choices[0].text
                .trim()
                .split(" ")
                .filter(tag => tag.startsWith("#"));
        } catch (error) {
            console.error("Error generating hashtags:", error);
            throw error;
        }
    }
}