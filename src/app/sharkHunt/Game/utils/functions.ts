import type { DirectionType, FishSchoolType, OceanSceneType } from "../../../../types/sharkHunt";
import configs from "../../../../configs/sharkHunt";

const {collisionDistance} = {...configs};
const pi = Math.PI;

const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getAngle = (startX: number, startY: number, endX: number, endY: number, direction:DirectionType ) => {
    let angle = 0;
    const xChange = Math.abs(endX - startX);
    const yChange = Math.abs(endY - startY);
    
    const tan  = direction === "top" || direction === "bottom" ? xChange / yChange : yChange / xChange;
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
        const dirY = Math.random() * height;
        let dirX = 0;
        y = Math.random() * height;
        if (fromLeft) {
            x = 0;
            dirX = width;
            angle = getAngle(x, y, dirX, dirY, "right")    
        } else {
            x = width;
            angle = getAngle(x, y, dirX,  dirY, "left");
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
    const dirX = Math.random() * width;
    let dirY = 0;
    x = Math.random() * width;
    if (fromTop) {
        y = 0;
        dirY = height;
        angle = getAngle(x, y, dirX,  dirY, "bottom")
    } else {
        y = height;
        angle = getAngle(x, y,  dirX, dirY, "top")
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
        y = Math.round(Math.random() * height);
    }
    else {
        const toTop = getRandomBoolean();
        direction = toTop ? "top" : "bottom";
        y = toTop ? -extraSpace : height + extraSpace;
        x = Math.round(Math.random() * width);
    }
    return ({
        x,
        y,
        direction
    })
}

export const generateUniqueId = () => {
    const randomNumber = Math.random();
    const randomString = randomNumber.toString(36);
    const uniqueId = randomString.replace(/\.[0-9]*/, "").replace(/^0+/, "");

    return uniqueId;
}

export const updateFrames = (jellyfishSprite: Phaser.GameObjects.Sprite, frameName:string, count: number) => {
    const { key } = { ...jellyfishSprite?.texture }
    let current = Number(key.slice(-1));
    if(current === count) current = 1;
    jellyfishSprite.setTexture(`${frameName}${current + 1}`);
}

export const checkForCollision = (scene: OceanSceneType, sysWidth: number, sysHeight: number) => {
    const { x = 0, y = 0 } = { ...scene.jellyfish.sprite }
    scene.fishSchools = scene.fishSchools.map((school: FishSchoolType) => {
        const { currentPosition = { x: 0, y: 0 }, fishCount = 1, fishes, escapingFrom } = { ...school }
        if (escapingFrom) return {...school};
        const { x: schoolX = 0, y: schoolY = 0 } = { ...currentPosition }
        if (((x < schoolX && x > schoolX - collisionDistance) ||
            (x > schoolX && x < schoolX + collisionDistance)) &&
            ((y < schoolY && y > schoolY - collisionDistance) ||
                (y > schoolY && y < schoolY + collisionDistance))) {
            const escapeDirections = [];
            for (let i = 0; i < fishCount; i++) {
                const escapeDirection = getEscapeDirection(sysWidth, sysHeight);
                escapeDirections.push(escapeDirection);
                const {x:escapeX,y:escapeY, direction} = {...escapeDirection};
                const angle = getAngle(schoolX, schoolY, escapeX, escapeY,  direction);
                let rotateFishIntervalRep = 0;
                const repeatance = Math.round(Math.random() * 4 + 1);
                const rotateInterval = setInterval(() => {
                    if(repeatance === rotateFishIntervalRep) {
                        fishes[i].setRotation(angle);
                        clearInterval(rotateInterval);
                        return;
                    }
                    rotateFishIntervalRep++;
                    fishes[i].setRotation(Math.round(Math.random() * pi))
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