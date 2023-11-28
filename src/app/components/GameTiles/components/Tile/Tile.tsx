"use client"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import styles from "../../../../../styles/components/GameTiles/Tile.module.scss"
import type { TileProps } from "../../../../../types/main"
import { backgroundImageVariants, cornerImageInitializeVariants, getCornerImageVariants, getTitleVariants } from "./utils/variants"

const Tile = ({ image, cornerImage, cornerInitialized, link, name, choseGame}: TileProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();

    const isMedium = window.innerWidth > 650;

    const changeHovered = useCallback((newValue: boolean) => setHovered(newValue), [setHovered])
    
    const clickTile = useCallback(() => {
        router.push(link)
        choseGame && choseGame();
    }, [choseGame, router])
    
    return (
        <motion.div
            className={styles.tile}
            onClick={clickTile}
            onMouseEnter={() => changeHovered(true)}
            onMouseLeave={() => changeHovered(false)}
        >
           {cornerImage && <motion.img
                src={cornerImage}
                className={styles.tile_corner_image}
                variants={cornerInitialized ? getCornerImageVariants() : cornerImageInitializeVariants}
                initial="initial"
                animate="animate"
            />}
            <motion.img
                src={image}
                className={styles.tile_image}
                alt={name}
                variants={backgroundImageVariants}
                initial="initial"
                animate={hovered ? "animate" : ""}
            />
            {hovered && <motion.p
                key={hovered.toString()}
                initial="initial"
                animate="animate"
                className={styles.tile_title}
                variants={getTitleVariants(isMedium)}
            >
                {name}
            </motion.p>
            }
        </motion.div>
    )
}

export default Tile;