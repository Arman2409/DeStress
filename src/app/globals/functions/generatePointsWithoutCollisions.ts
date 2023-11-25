import { inRange, random } from "lodash"

import type { Point } from "../../../types/main"

const generateWithoutCollisions = (
    others: Point[],
    width: number,
    height: number,
    distance: number): Point => {
    try {
        const x = random(distance, width - distance);
        const y = random(distance, height - distance);
        // checking for collisions 
        let hasCollides = false;
        others.forEach(({ x: otherX, y: otherY }) => {
            if (inRange(x, otherX - distance, otherX + distance)
                && inRange(y, otherY - distance, otherY + distance)) {
                hasCollides = true;
            }
        })
        if (hasCollides) {
            return generateWithoutCollisions(
                others,
                width,
                height,
                distance);
        } else {
            return { x, y };
        }
    } catch (e) {
       return generateWithoutCollisions(
        others,
        width,
        height,
        distance);;
    }
}

export default generateWithoutCollisions;