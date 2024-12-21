import { Frame } from "@nativescript/core";

export class NavigationService {
    static navigate(page: string, context?: any) {
        const frame = Frame.topmost();
        frame.navigate({
            moduleName: `views/${page}/${page}-page`,
            context
        });
    }

    static goBack() {
        const frame = Frame.topmost();
        frame.goBack();
    }
}