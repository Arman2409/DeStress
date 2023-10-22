import type { DirectionType, FishSchoolType, OceanSceneType } from "../../../../types/sharkHunt";

const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getAngle = (start: number, end: number, size: number, direction:DirectionType ) => {
    const pi = Math.PI;
    let angle = 0;
    const distance = end - start;
    const angleDifference = Math.abs(distance) / size * (pi / 2);
    
    switch (direction) {
        case "right":
            if (distance) {
                angle = (pi / 2) + angleDifference;
            } else {
                angle = (pi / 2) - angleDifference;
            }
            break;
        case "bottom":
            if (distance) {
                angle = pi - angleDifference;
            } else {
                angle = pi + angleDifference;
            }
            break;
        case "left":
            if (distance) {
                angle = pi * 1.5 - angleDifference;
            } else {
                angle = pi * 1.5 + angleDifference;
            }
            break;
        case "top":
            if (distance) {
                angle = angleDifference;
            } else {
                angle = pi * 2 - angleDifference;
            }
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
            angle = getAngle(y, dirY, height, "right")    
        } else {
            x = width;
            angle = getAngle(y, dirY, height, "left");
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
        angle = getAngle(x, dirX, width, "bottom")
    } else {
        y = height;
        angle = getAngle(x, dirX, width, "top")
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

export const updateSharkFrame = (sharkSprite: Phaser.GameObjects.Sprite) => {
    const { key } = { ...sharkSprite?.texture }
    if (key === "sharkFrame1") {
        sharkSprite?.setTexture("sharkFrame2");
        return;
    }
    if (key === "sharkFrame2") {
        sharkSprite?.setTexture("sharkFrame3");
        return;
    }
    if (key === "sharkFrame3") {
        sharkSprite?.setTexture("sharkFrame1");
        return;
    }
}

export const checkForCollision = (scene: OceanSceneType, sysWidth: number, sysHeight: number) => {
    const { x = 0, y = 0 } = { ...scene.shark.sprite }
    scene.fishSchools = scene.fishSchools.map((school: FishSchoolType) => {
        const { currentPosition = { x: 0, y: 0 }, fishCount = 1, fishes } = { ...school }
        const { x: schoolX = 0, y: schoolY = 0 } = { ...currentPosition }
        if (((x < schoolX && x > schoolX - 200) ||
            (x > schoolX && x < schoolX + 200)) &&
            ((y < schoolY && y > schoolY - 200) ||
                (y > schoolY && y < schoolY + 200))) {
            const escapeDirections = [];
            for (let i = 0; i < fishCount; i++) {
                const escapeDirection = getEscapeDirection(sysWidth, sysHeight);
                console.log(escapeDirection);
                escapeDirections.push(escapeDirection);
                const {x:escapeX,y:escapeY, direction} = {...escapeDirection};
                let start = 0, end = 0, size = 0;
                if (direction === "left" || direction === "right") {
                    start = schoolX;
                    end = escapeX;
                    size = sysWidth;
                }
                if (direction === "top" || direction === "bottom") {
                    start = schoolY;
                    end = escapeY;
                    size = sysHeight; 
                }
                const angle = getAngle(start, end, size, direction);
                fishes[i].setRotation(angle);
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