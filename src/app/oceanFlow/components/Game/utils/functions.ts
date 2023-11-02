import { inRange, random, remove } from "lodash"

import type { DirectionType, FishSchoolType, OceanSceneType } from "../../../../../types/oceanFlow"
import type { PointType } from "../../../../../types/main"
import configs from "../../../../../configs/oceanFlow";
import generateWithoutCollisions from "../../../../globals/functions/generatePointsWithoutCollisions";
import generateUniqueId from "../../../../globals/functions/generateUniqueId";

const {
    collisionDistance,
    maxFishEachSchool,
    plantsCountRange } = { ...configs };
const pi = Math.PI;
const randomFishColors = [
    0xFF0000, 0x00FF00, 0x0000FF, 0xFFCC00, 0x00FFCC,
    0xCC00FF, 0xFFFFFF, 0x000000, 0xABCDEF, 0xFF6347,
    0xB3EE3A, 0xDF0030, 0x0080FF, 0xEE82EE,
    0xFF00FF, 0xFFFF00, 0x4B0082, 0x000080,
    0x663399, 0x008000, 0xFFD700, 0xFFA500,
    0x00FF7F, 0x00FFFF, 0x87CEEB, 0x0000CD,
    0x4169E1, 0x8A2BE2, 0x9932CC, 0xBD82EE, 0xFF0090]

const getRandomBoolean = () => Boolean(random(0, 1));

const getRandomFishColor = () => {
    return randomFishColors[random(0, randomFishColors.length)]
}

export const getAngle = (startX: number, startY: number, endX: number, endY: number, direction: DirectionType) => {
    let angle = 0;
    const xChange = Math.abs(endX - startX);
    const yChange = Math.abs(endY - startY);

    const tan = direction === "top" || direction === "bottom" ? xChange / yChange : yChange / xChange;
    const angle_in_radians = Math.atan(tan);

    switch (direction) {
        case "right":
            angle = endY - startY > 0 ? (pi / 2) + angle_in_radians : (pi / 2) - angle_in_radians;
            break;
        case "bottom":
            angle = endX - startX > 0 ? pi - angle_in_radians : pi + angle_in_radians;
            break;
        case "left":
            angle = endY - startY > 0 ? (pi * 1.5) - angle_in_radians : (pi * 1.5) + angle_in_radians;
            break;
        case "top":
            angle = endX - startX > 0 ? (pi * 2) + angle_in_radians : (pi * 2) - angle_in_radians;
            break;
    }
    return angle;
}

export const getRandomSchoolDetails = (width: number, height: number) => {
    let x: number, y: number, angle = 0;
    const fromSide = getRandomBoolean();
    if (fromSide) {
        const fromLeft = getRandomBoolean();
        const dirY = random(0, height);;
        let dirX = 0;
        y = random(0, height);
        if (fromLeft) {
            x = 0;
            dirX = width;
            angle = getAngle(x, y, dirX, dirY, "right")
        } else {
            x = width;
            angle = getAngle(x, y, dirX, dirY, "left");
        }
        return {
            x,
            y,
            dirY,
            dirX,
            angle
        }
    }
    const fromTop = getRandomBoolean();
    const dirX = random(0, width);
    let dirY = 0;
    x = Math.random() * width;
    if (fromTop) {
        y = 0;
        dirY = height;
        angle = getAngle(x, y, dirX, dirY, "bottom")
    } else {
        y = height;
        angle = getAngle(x, y, dirX, dirY, "top")
    }
    return {
        x,
        y,
        dirX,
        dirY,
        angle
    }
}

export const getEscapeDirection = (width: number, height: number) => {
    let x = 0, y = 0, direction: DirectionType;
    const extraSpace = 120;
    const toSide = getRandomBoolean();
    if (toSide) {
        const toLeft = getRandomBoolean();
        direction = toLeft ? "left" : "right";
        x = toLeft ? -extraSpace : width + extraSpace;
        y = random(0, height);
    }
    else {
        const toTop = getRandomBoolean();
        direction = toTop ? "top" : "bottom";
        y = toTop ? -extraSpace : height + extraSpace;
        x = random(0, width);
    }
    return ({
        x,
        y,
        direction
    })
}

export const checkForCollision = (scene: OceanSceneType, sysWidth: number, sysHeight: number, callback: Function) => {
    const { x = 0, y = 0 } = { ...scene.jellyfish }
    scene.fishSchools = scene.fishSchools.map((school: FishSchoolType) => {
        const { currentPosition = { x: 0, y: 0 }, id, fishCount = 1, fishes, escapingFrom } = { ...school }
        if (escapingFrom) return { ...school };
        const { x: schoolX = 0, y: schoolY = 0 } = { ...currentPosition }
        if ((inRange(x, schoolX - collisionDistance, schoolX)
            || inRange(x, schoolX, schoolX + collisionDistance)
        ) &&
            (inRange(y, schoolY - collisionDistance, schoolY)
                || inRange(y, schoolY, schoolY + collisionDistance))) {
            callback(id, fishCount);
            const escapeDirections = [];
            for (let i = 0; i < fishCount; i++) {
                const escapeDirection = getEscapeDirection(sysWidth, sysHeight);
                escapeDirections.push(escapeDirection);
                const { x: escapeX, y: escapeY, direction } = { ...escapeDirection };
                const angle = getAngle(schoolX, schoolY, escapeX, escapeY, direction);
                let rotateFishIntervalRep = 0;
                const repeatance = random(1, 5);
                const rotateInterval = setInterval(() => {
                    if (repeatance === rotateFishIntervalRep) {
                        fishes[i].setRotation(angle);
                        clearInterval(rotateInterval);
                        return;
                    }
                    rotateFishIntervalRep++;
                    fishes[i].setRotation(random(0, pi))
                }, 150)
            }
            return {
                ...school,
                escapingFrom: {
                    x: schoolX,
                    y: schoolY
                },
                escapeDirections
            }
        }
        return { ...school }
    })
}

export const addPlants = (scene: OceanSceneType) => {
    const plantsCount = random(plantsCountRange[0], plantsCountRange[1]) + 2;
    const placeMents: PointType[] = [];
    const { width, height } = scene.sys.cameras.main;
    for (let i = 1; i <= plantsCount; i++) {
        const { x, y } = generateWithoutCollisions(placeMents, width, height, 75);
        scene.add.sprite(x, y, "plantFrame").setScale(0.2).setDepth(1).setRotation(Math.random() * 6.24);
    }
}


const removeFishSchool = (school: FishSchoolType, scene: OceanSceneType) => {
    school.fishes.forEach((fish) => {
        fish.destroy();
    })
    clearInterval(school.interval);
    remove(scene.fishSchools, ({ id = 0 }) => {
        return id === school.id;
    })
}

export const createRandomFishSchool = (scene: OceanSceneType) => {
    const fishCount = random(1, maxFishEachSchool);
    const newSchool: FishSchoolType =
    {
        id: generateUniqueId(scene.fishSchools),
        fishes: [],
        startingPoint: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
        currentPosition: { x: 0, y: 0 },
        fishCount,
        interval: [],
        escapingFrom: null,
        escapeDirections: []
    };
    const { width, height } = scene.sys.game.canvas;
    let { x, y, dirX, dirY, angle } = getRandomSchoolDetails(width, height);

    for (let count = 0; count < fishCount; count++) {
        const newFish = scene.add.sprite(x + random(0, 150), y + random(0, 150), "fishFrame1").setScale(0.075);
        newFish.setRotation(angle).setDepth(1).setTint(getRandomFishColor());
        newSchool.fishes.push(newFish);
    }
    newSchool.startingPoint = { x, y }
    newSchool.currentPosition = { x, y }
    newSchool.direction = { x: dirX, y: dirY }
    let intervalRepeat = 0;
    newSchool.interval = setInterval(() => {
        if (intervalRepeat > 150) {
            removeFishSchool(newSchool, scene)
            return;
        }
        const school = scene.fishSchools.find(({ id }) => id === newSchool.id);
        const isEscaping = Boolean(school?.escapingFrom);
        if (isEscaping) {
            const { x: escapeX = 0, y: escapeY = 0 } = { ...school?.escapingFrom }
            x = escapeX;
            y = escapeY;
        }
        intervalRepeat++;
        const repeat = random(10, 100);
        let xChange = (dirX - x) / repeat;
        let yChange = (dirY - y) / repeat;
        let { x: currentX = 0, y: currentY = 0 } = { ...school?.currentPosition };
        if (currentX < -300 || currentX > width + 300
            || currentY < -300 || currentY > height + 300) {
            removeFishSchool(newSchool, scene)
            return;
        }
        const currentPosition = {
            x: currentX += xChange,
            y: currentY += yChange,
        }
        scene.fishSchools = scene.fishSchools.map((school) => {
            const { id = 0 } = { ...school };
            if (id === newSchool.id) {
                return ({
                    ...school,
                    currentPosition
                });
            }
            return { ...school };
        })
        newSchool.fishes.forEach((fish: any, index: number) => {
            if (isEscaping) {
                const { x: dirX, y: dirY } = school?.escapeDirections[index] as PointType;
                xChange = (dirX - x) / (repeat / 2);
                yChange = (dirY - y) / (repeat / 2);
            }
            fish.x += xChange;
            fish.y += yChange;
            fish.setTexture(`fishFrame${random(1, 3)}`)
        })
    }, 50)
    scene.fishSchools.push(newSchool)
}