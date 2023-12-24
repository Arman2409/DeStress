import { motion } from "framer-motion";

import styles from "../../../../styles/pages/Home/components/Greeting/Greeting.module.scss";
import { logoVariants } from "./utils/variants";
import LettersAnimation from "./components/LettersAnimation/LettersAnimation";

const Greeting = () => (
   <div
      className={styles.main}>
      <motion.img
         src="/logos/logo_title.png"
         initial="initial"
         animate="animate"
         className={styles.title}
         variants={logoVariants}
      />
      <LettersAnimation/>
   </div>
)


export default Greeting;