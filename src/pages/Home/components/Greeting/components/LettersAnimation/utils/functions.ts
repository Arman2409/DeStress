import { lettersPlacementBreakpoints, lettersSpacingBreakpoints } from "./data";
import type { Point } from "../../../../../../../types/home";

export const getPlacement = (windowWidth: number):Point => {
    const breakpoints: any[] = Object.keys(lettersPlacementBreakpoints).reverse();
    let placement:any = null;
    breakpoints.forEach((breakpoint: string) => {
        if(placement) return false;
        if (windowWidth > Number(breakpoint)) {
            const letterBreakpoints:any = lettersPlacementBreakpoints;
            placement = letterBreakpoints[breakpoint];
        }
    })
    return placement;
}

export const getSpacing = (windowWidth: number) => {
    let spacing = 0;
    const breakpoints: any[] = Object.keys(lettersSpacingBreakpoints).reverse();
    breakpoints.forEach((breakpoint: string) => {
        if (spacing) return false;
        if (windowWidth > Number(breakpoint)) {
            const spacingBreakpoints:any = lettersSpacingBreakpoints;
            spacing = spacingBreakpoints[breakpoint];
        }
    })
    return spacing;
}