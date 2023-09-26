"use client"

import Space from "antd/lib/space"

import { gamesData } from "./utils/data"
import type { GameType } from "../../../types/types"
import Tile from "./components/Tile/Tile"

const GameTiles = () => {
    const games = gamesData.sort(({order}, {order:currOrder}) => {
         return order - currOrder
    })

    return (
        <Space size={[4,4]}>
           {games.map((gameData:GameType) => (
              <Tile key={gameData.order} {...gameData} />
           ))}
        </Space>
    )
}

export default GameTiles;