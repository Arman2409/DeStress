import { chunk } from "lodash"

import styles from "../../../styles/components/GameTiles/GameTiles.module.scss"
import type { GameTilesProps, Game } from "../../../types/main"
import { gamesData } from "./utils/data"
import Tile from "./components/Tile/Tile"

const GameTiles = ({choseGame}: GameTilesProps) => {
    const games = gamesData.sort(({ order }, { order: currOrder }) => {
        return order - currOrder;
    })
    const gameGroups = chunk(games, 4);

    return (
        <div className={styles.game_tiles_main}>
            <div className={styles.games_groups}>
                {gameGroups.map((games: Game[], index) => (
                    <div
                        key={index}
                        className={styles.games_group}>
                        {games.map((game: Game) => (
                            <Tile {...game} choseGame={choseGame} key={game.order} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameTiles;