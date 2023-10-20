const getRandomBoolean = () => Boolean(Math.round(Math.random())); 

export const getRandomSchoolDetails = (width:number, height:number) => {
    let x: number, y: number, angle: number = 0;
    const pi = Math.PI;
    const fromSide = getRandomBoolean();
    if (fromSide) {
        const fromLeft = getRandomBoolean();
        const dirY = Math.random() * height;
        let dirX = 0;
        y = Math.random() * height;
        const dy = dirY - y;
        const angleDifference = Math.abs(dy) / width * (pi / 2);
        if (fromLeft) {
            x = 0;
            dirX = width;
            if (dy > 0) {
                angle = (pi / 2) + angleDifference
            } else {
                angle = (pi / 2) - angleDifference;
            }
        } else {
            x = width;
            if (dy > 0) {
                angle = pi * 1.5 - angleDifference
            } else {
                angle = pi * 1.5 + angleDifference;
            }
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
    const dx = dirX - x;
    const angleDifference = Math.abs(dx) / width * (pi / 2);
    if (fromTop) {
        y = 0;
        dirY = height;
        if (dx > 0) {
            angle = pi - angleDifference;
        } else {
            angle = pi + angleDifference
        }
    } else {
        y = height;
        if (dx > 0) {
            angle = angleDifference;
        } else {
            angle = pi * 2 - angleDifference
        }
    }
    return {
        x,
        y,
        dirX,
        dirY,
        angle
    }
}

export const getEscapeDirection = (width:number, height:number) => { 
    let x:number = 0, y:number = 0;
    const extraSpace = 120;
    const toSide = getRandomBoolean();
    if (toSide) {   
       const toLeft = getRandomBoolean();
       x = toLeft ? -extraSpace : width + extraSpace;
       y = Math.round(Math.random() * height);
    }
    else {
        const toTop = getRandomBoolean();
        y = toTop ? -extraSpace : height + extraSpace;
        x = Math.round(Math.random() * width);
    }   
    return ({
        x,
        y
    })
}

export const generateUniqueId = () => {
    const randomNumber = Math.random();
    const randomString = randomNumber.toString(36);
    const uniqueId = randomString.replace(/\.[0-9]*/, "").replace(/^0+/, "");
  
    return uniqueId;
}