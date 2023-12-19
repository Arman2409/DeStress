import type { Variants } from "framer-motion";

export const getVariants = (fromTop: boolean): Variants => ({
    initial: {
        top:  fromTop ? "-70px" : "21px",
    },
    animate: {
        top: fromTop ? "21px" : "70px",
        transition: {
            duration: 1
        }
    }
})
