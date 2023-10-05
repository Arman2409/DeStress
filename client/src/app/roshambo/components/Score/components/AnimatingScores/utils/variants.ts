import { Variants } from "framer-motion";

export const getVariants = (fromTop: boolean): Variants => ({
    initial: {
        top:  fromTop ? "-70px" : "12px",
    },
    animate: {
        top: fromTop ? "12px" : "70px",
        transition: {
            duration: 1
        }
    }
})
