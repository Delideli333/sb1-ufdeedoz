export class ErrorHandler {
    static handleError(error: Error, context: string): void {
        console.error(`Error in ${context}:`, error);
        // Add error reporting/analytics here
    }

    static async wrapAsync<T>(
        operation: () => Promise<T>,
        context: string
    ): Promise<T | null> {
        try {
            return await operation();
        } catch (error) {
            this.handleError(error as Error, context);
            return null;
        }
    }
}