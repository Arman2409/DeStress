"use client"
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import styles from "../../../../../styles/components/GameTiles/Tile.module.scss"
import type { TileProps } from "../../../../../types/main";
import { backgroundImageVariants, cornerImageVariants, titleVariants } from "./utils/variants";

const Tile = ({ image, cornerImage, link, name, choseGame}: TileProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();

    const clickTile = useCallback(() => {
        router.push(link)
        choseGame && choseGame()
    }, [choseGame, router])
    
    return (
        <motion.div
            className={styles.tile}
            onClick={clickTile}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
           {cornerImage && <motion.img
                src={cornerImage}
                className={styles.tile_corner_image}
                variants={cornerImageVariants}
                initial="initial"
                animate="animate"
            />}
            <motion.img
                src={image}
                key={hovered.toString()}
                className={styles.tile_image}
                variants={backgroundImageVariants}
                initial="initial"
                animate={hovered ? "animate" : ""}
            />
            {hovered && <motion.p
                key={hovered.toString()}
                initial="initial"
                animate="animate"
                className={styles.tile_title}
                variants={titleVariants}
            >
                {name}
            </motion.p>
            }
        </motion.div>
    )
}

export default Tile;