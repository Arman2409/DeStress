import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../../../../../../styles/pages/Home/components/GameTiles/Tile.module.scss";
import type { TileProps } from "../../../../../../types/home";
import { backgroundImageVariants, cornerImageInitializeVariants, getCornerImageVariants, getTitleVariants } from "./utils/variants";

const Tile = ({ image, cornerImage, cornerInitialized, link, name, choseGame}: TileProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    const isMedium = window.innerWidth > 650;

    const changeHovered = useCallback((newValue: boolean) => setHovered(newValue), [setHovered])
    
    const clickTile = useCallback(() => {
        navigate(link)
        choseGame && choseGame();
    }, [choseGame, navigate, link])
    
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
                className="absolute_background"
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