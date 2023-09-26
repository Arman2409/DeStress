"use client"

import { motion } from "framer-motion"

import styles from "../../../../../styles/components/greeting.module.scss"

const Greeting = () => {
   return (
      <div className={styles.main}>
       <img src="/logo_title.png" />
      </div>
   )  
}

export default Greeting;