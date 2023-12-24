import type { Variants } from "framer-motion";

export const logoVariants: Variants = {
  initial: {
    transform: "rotate(360deg) scale(0)",
  },
  animate: {
    transform: "rotate(0deg) scale(1)",
    transition: {
      duration: 1,
      ease: "circInOut"
    }
  }
}