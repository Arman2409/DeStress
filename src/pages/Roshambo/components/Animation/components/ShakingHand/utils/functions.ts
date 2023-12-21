import type { Jest } from "../../../../../../../types/roshambo";
import { jestImages } from "./data";

export const getImageSrc = (jestName: Jest, jestSide: "left"|"right") => {
    const sideImages = jestImages[jestSide as keyof typeof jestImages];
    return sideImages[jestName as keyof typeof sideImages];
}