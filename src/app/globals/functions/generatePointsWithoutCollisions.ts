import { inRange, random } from "lodash"

import type { PointType } from "../../../types/main"

const generateWithoutCollisions = (others: PointType[], width: number, height: number, distance: number) => {
    const x = random(distance, width - distance);
    const y = random(distance, height - distance);

    others.forEach(({ x: otherX, y: otherY }) => {
        if (inRange(x, otherX - distance, otherX + distance)
            && inRange(y, otherY - distance, otherY + distance)) {
            return generateWithoutCollisions(
                others,
                width,
                height,
                distance);
        }
    })
    return { x, y };
}

export default generateWithoutCollisions;