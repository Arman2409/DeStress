import type { Jest } from "../../../../../types/roshambo";
import { jestImages } from "../components/ShakingHand/utils/data";

export const getRandomJest = ():Jest => {
    const randomNumber = Math.round(Math.random() * 2);
    return Object.keys(jestImages.left)[randomNumber] as Jest;
}
export const getRandomBackground = (backgrounds:string[]) => backgrounds[Math.floor(Math.random() * backgrounds.length)];
