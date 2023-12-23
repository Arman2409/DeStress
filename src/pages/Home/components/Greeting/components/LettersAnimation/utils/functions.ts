import { lettersSpacingsAndWidths } from "./data";
import type { SubtitleDetails } from "../../../../../../../types/home";

export const getSpacingAndWidth = (windowWidth: number):SubtitleDetails => {
    let details:any = null;
    const breakpoints: any[] = Object.keys(lettersSpacingsAndWidths).reverse();
    breakpoints.forEach((breakpoint: string) => {
        if (details) return false;
        if (windowWidth > Number(breakpoint)) {
            const spacingBreakpoints:any = lettersSpacingsAndWidths;
            details = spacingBreakpoints[breakpoint];
        }
    })
    return details;
}