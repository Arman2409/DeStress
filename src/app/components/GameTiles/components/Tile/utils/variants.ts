import { random } from "lodash";
import type { Variants } from "framer-motion";

import configs from "../../../../../../configs/components";

const {cornerImageInitialingDuration} = {...configs};

export const titleVariants: Variants = {
    initial: {
        fontSize: "0px",
        opacity: 1
    },
    animate: {
        fontSize: "20px",
        opacity: 1,
        transition: {
            duration: 0.4
        }
    }
}

export const cornerImageInitializeVariants: Variants = {
    initial: {
        maxWidth: "40px",
        maxHeight: "40px",
        top: "-20px",
        right: "-20px",
    },
    animate: {
        maxWidth: "80px",
        maxHeight: "80px",
        top: "-40px",
        right: "-40px",
        transition: {
            duration: cornerImageInitialingDuration
        }
    }
}

export const getCornerImageVariants = (): Variants => {
    const getRandomPlace = () => random(30, 50);
    const repeatance = 4;
    const initial = "-40px";
    const topArr: string[] = [initial];
    const rightArr: string[] = [initial];
    for (let i = 1; i <= repeatance; i++) {
        if (i === repeatance) {
            topArr.push(initial);
            rightArr.push(initial);
            continue;
        }
        topArr.push(`-${getRandomPlace()}px`);
        rightArr.push(`-${getRandomPlace()}px`);
    }
    return (
        {
            initial: {
                maxWidth: "80px",
                maxHeight: "80px",
                top: "-40px",
                right: "-40px",
            },
            animate: {
                top: topArr,
                right: rightArr,
                transition: {
                    duration: 5,
                    repeat: Infinity
                }
            }
        })
}

export const backgroundImageVariants = {
    initial: {
        opacity: 1
    },
    animate: {
        opacity: 0.3
    }
}