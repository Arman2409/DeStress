import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "../../../../../styles/components/GameTiles/Tile.module.scss"
import type { GameType } from "../../../../../types/types";
import { hoverContVariants } from "./utils/variants";

const Tile = ({ image, link }: Omit<GameType, "order">) => {
    const [hovered, setHovered] = useState<boolean>(false);
    
    useEffect(() => {
     console.log(hovered);
     
    }, [hovered])
    return (
        <motion.div 
          className={styles.tile}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          >
            <img
                src={image}
                className={styles.tile_image}
            />
            <motion.div
                key={hovered.toString()}
                className={styles.tile_hover_cont}
                variants={hoverContVariants}

            >      
            </motion.div>
        </motion.div>
    )
}

export default Tile;