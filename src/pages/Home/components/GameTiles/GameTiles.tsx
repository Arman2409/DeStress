import { useEffect, useState } from "react";
import { chunk } from "lodash";

import styles from "../../../../styles/pages/Home/components/GameTiles/GameTiles.module.scss";
import type { GameTilesProps, Game } from "../../../../types/main";
import configs from "../../../../configs/components";
import { gamesData } from "./utils/data";
import Tile from "./components/Tile/Tile";

const { cornerImageInitialingDuration } = { ...configs };

const GameTiles = ({ choseGame }: GameTilesProps) => {
    const [initializedCorners, setInitializedCorners] = useState<boolean>(false);

    const games = gamesData.sort(({ order }, { order: currOrder }) => {
        return order - currOrder;
    })
    const gameGroups = chunk(games, 3);

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