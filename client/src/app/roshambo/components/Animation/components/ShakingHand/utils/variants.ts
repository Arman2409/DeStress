import type { Variants } from "framer-motion";

export const shakingImageVariants: Variants = {
    initial: {
        transform: "rotate(0deg)"
    },
    animate: {
        transform: ["rotate(5deg)", "rotate(5deg)", "rotate(0deg)"],
        transition: {
            duration: 0.5,
            repeat: 1,
            repeatType: "reverse"
        }
    }
}