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
  },
  hover: {
    transform: "rotate(0deg) scale(0.8)",
    transition: {
      duration: 1,
      ease: "easeIn"
    }
  }
}

export const subTitleVariants: Variants = {
  ...logoVariants,
  animate: {
    ...logoVariants.animate,
    transition: {
      duration: 1,
      ease: "easeIn",
      delay: 1,
    }
  }
}