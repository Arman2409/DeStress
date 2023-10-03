import { PiWineBold } from "react-icons/pi"
import { FaHeartBroken, FaEquals } from "react-icons/fa"


export const combinations = {
    winning: [
        ["scissors", "paper"],
        ["paper", "rock"],
        ["rock", "scissors"]
    ],
    defeating: [
        ["scissors", "rock"],
        ["paper", "scissors"],
        ["rock", "paper"]
    ]
}

export const statusesData = {
    texts: {
        "win": "You won!",
        "lose": "You lost...",
        "draw": "Draw"   
    },
    icons: {
        "win": PiWineBold,
        "lose": FaHeartBroken,
        "draw": FaEquals
    }
}