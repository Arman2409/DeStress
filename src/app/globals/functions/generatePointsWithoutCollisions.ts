import { inRange, random } from "lodash"

import type { Point } from "../../../types/main"

const generateWithoutCollisions = (
    others: Point[],
    width: number,
    height: number,
    distance: number): Point => {
    const x = random(distance, width);
    const y = random(distance, height);
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
}

export default generateWithoutCollisions;