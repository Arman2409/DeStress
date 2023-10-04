import { Variants } from "framer-motion";

export const arrowIconVariants:Variants = {
    animate: {
        transform: ["rotate(-20deg)", "rotate(20deg)", "rotate(0deg)"],
        transition: {
            duration: 1,
            ease: "easeInOut",
        }
    }
} 