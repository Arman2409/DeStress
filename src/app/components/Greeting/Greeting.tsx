"use client"
import { motion } from "framer-motion";

import styles from "../../../styles/components/Greeting.module.scss";
import { logoVariants, subTitleVariants } from "./utils/variants";

const Greeting = () => (
   <div
     className={styles.main}>
      <motion.img
         src="/logos/logo_title.png"
         initial="initial"
         animate="animate"
         whileHover="hover"
         className={styles.title}
         variants={logoVariants}
      />
      <motion.p
         initial="initial"
         animate="animate"
         whileHover="hover"
         className={styles.sub_title}
         variants={subTitleVariants} >
         Antistress games' compilation
      </motion.p>
   </div>
)


export default Greeting;