import { chunk } from "lodash"

import styles from "../../../styles/components/GameTiles/GameTiles.module.scss"
import { gamesData } from "./utils/data"
import type { GameType } from "../../../types/types"
import Tile from "./components/Tile/Tile"

const GameTiles = () => {
    const games = gamesData.sort(({ order }, { order: currOrder }) => {
        return order - currOrder;
    })

    const gameGroups = chunk(games, 4);

    return (
        <div className={styles.game_tiles_main}>
            <div className={styles.games_groups}>
                {gameGroups.map((games: GameType[], index) => (
                    <div
                        key={index}
                        className={styles.games_group}>
                        {games.map((game: GameType) => (
                            <Tile {...game} key={game.order} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameTiles;