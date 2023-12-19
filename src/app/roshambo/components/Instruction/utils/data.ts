import type { JestDetails } from "../../../../../types/roshambo";

export const jestsData:JestDetails[] = [
    {
        name: "paper",
        keys: ["1", "End"],
        keyboardImg: "/roshambo/keyboard_key_1.png",
        jestImg: "/roshambo/paper.webp"
    },
    {
        name: "scissors",
        keys: ["2", "ArrowDown"],
        keyboardImg: "/roshambo/keyboard_key_2.png",
        jestImg: "/roshambo/scissors.webp"
    },
    {
        name: "rock",
        keys: ["3", "PageDown"],
        keyboardImg: "/roshambo/keyboard_key_3.png",
        jestImg: "/roshambo/rock.webp"
    }
]