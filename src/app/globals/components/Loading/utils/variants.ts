import { Variants } from "framer-motion"

export const logoVariants:Variants = {
   initial: {
      transform: "rotate(0deg) translate(0px)",
   },
   animateLogo1: {
    transform: ["rotate(180deg) translate(0px)", "rotate(0deg) translate(50px)", "rotate(0deg)  translate(0px)",],
    transition: {
        duration: 2,
        repeat: Infinity
    }
   },
   animateLogo2: {
      transform: ["rotate(180deg)  translate(0px)", "rotate(0deg) translate(-50px)", "rotate(0deg)  translate(0px)"],
      transition: {
          duration: 2,
          repeat: Infinity
      }
     },
}