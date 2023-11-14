import type { Variants } from "framer-motion";

export const keyboardKeyVariants: Variants = {
    initial: {
       width: 50,
       height: 50
    },
    animate: {
        width: 35,
        height: 35,
        transition: {
            duration: 0.2
        }
    }

}