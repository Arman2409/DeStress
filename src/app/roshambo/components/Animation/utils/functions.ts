import type { JestType } from "../../../../../types/roshambo";
import { jestImages } from "../components/ShakingHand/utils/data"

export const getRandomJest = ():JestType => {
    const randomNumber = Math.round(Math.random() * 2);
    return Object.keys(jestImages.left)[randomNumber] as JestType;
}
