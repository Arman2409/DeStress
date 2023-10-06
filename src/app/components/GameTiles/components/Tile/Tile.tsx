"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import styles from "../../../../../styles/components/GameTiles/Tile.module.scss"
import type { GameType } from "../../../../../types/types";
import { hoverContVariants } from "./utils/variants";

const Tile = ({ image, link, name }: Omit<GameType, "order">) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();

    return (
        <motion.div 
          className={styles.tile}
          onClick={() => router.push(link)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          >
            <img
                src={image}
                className={styles.tile_image}
            />
            {hovered && <motion.div
                key={hovered.toString()}
                initial="initial"
                animate="animate"
                className={styles.tile_hover_cont}
                variants={hoverContVariants}
            > 
             {name}
            </motion.div>}
        </motion.div>
    )
}

export default Tile;