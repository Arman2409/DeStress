import { Variants } from "framer-motion";

export const hoverContVariants:Variants = {
    initial: {
       left: "100px",
    },
    animate: {
        left: "0px",
        transition: {
            duration: 0.4
        }
    }
}