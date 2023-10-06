import { Variants } from "framer-motion";

export const titleVariants:Variants = {
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

export const cornerImageVariants:Variants = {
    initial:{
        maxWidth: "40px",
        maxHeight: "40px",
        top: "-20px",
        right: "-0px",
    },
    animate: {
        maxWidth: "80px",
        maxHeight: "80px",
        top: "-40px",
        right: "-0px",
        transition: {
            duration: 2
        }
    }
}

export const backgroundImageVariants = {
    initial: {
        opacity: 1
    },
    animate: {
        opacity: 0.3
    }
}