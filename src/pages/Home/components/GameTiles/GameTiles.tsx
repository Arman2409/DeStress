import { useEffect, useState } from "react";

import styles from "../../../../styles/pages/Home/components/GameTiles/GameTiles.module.scss";
import type { GameTilesProps, Game } from "../../../../types/home";
import configs from "../../../../configs/home";
import { gamesData } from "./utils/data";
import Tile from "./components/Tile/Tile";
import getChunks from "../../../../globals/functions/grtChunks";

const { cornerImageInitialingDuration } = { ...configs };

const GameTiles = ({ choseGame }: GameTilesProps) => {
    const [initializedCorners, setInitializedCorners] = useState<boolean>(false);

    const games = gamesData.sort(({ order }, { order: currOrder }) => {
        return order - currOrder;
    })
    const gameGroups = getChunks(games, 2);

    console.log(gameGroups);
    
    useEffect(() => {
        setTimeout(() => {
            setInitializedCorners(true);
        }, cornerImageInitialingDuration * 1000)
    }, [setInitializedCorners])

    return (
        <div className={styles.game_tiles_main}>
            <div className={styles.games_groups}>
                {gameGroups.map((games: Game[], index) => (
                    <div
                        key={index}
                        className={styles.games_group}>
                        {games.map((game: Game) => (
                            <Tile
                                key={game.order}
                                choseGame={choseGame}
                                cornerInitialized={initializedCorners}
                                {...game}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameTiles;