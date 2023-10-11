"use client"

import { motion } from "framer-motion"

import styles from "../../../styles/components/Greeting.module.scss"
import { logoVariants } from "./utils/variants"

const Greeting = () => {
   return (
      <div className={styles.main}>
         <motion.img
            src="/logos/logo_title.png"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={logoVariants}
         />
      </div>
   )
}

export default Greeting;