import type { JestType } from "../../../../../../../types/roshambo"
import { jestImages } from "./data"

export const getImageSrc = (jestName: JestType, jestSide: "left"|"right") => {
    const sideImages = jestImages[jestSide as keyof typeof jestImages];
    return sideImages[jestName as keyof typeof sideImages];
}