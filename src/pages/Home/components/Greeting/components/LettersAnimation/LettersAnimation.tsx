import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

import styles from "../../../../../../styles/pages/Home/components/Greeting/components/LettersAnimation.module.scss";
import type { Point } from "../../../../../../types/home";
import { getPlacement, getSpacing } from "./utils/functions";
import configs from "../../../../../../configs/home";

const { subTitle } = { ...configs };

const LettersAnimation = () => {
    const innerWidth = window.innerWidth;
    const [lettersPlacement, setLettersPlacement] = useState<Point>(getPlacement(innerWidth));
    const [spacing, setSpacing] = useState<number>(getSpacing(innerWidth));
    const lettersInitialized = useRef<boolean>(false);
    const lettersMain = useRef<any>(null);

    useEffect(() => {
        if (lettersInitialized.current) return;
        lettersInitialized.current = true;
        const windowWidth = window.innerWidth;
        const letters = subTitle.split("");
        letters.forEach((letter: string, order: number) => {
            const letterP = document.createElement("p");
            letterP.innerHTML = letter;
            letterP.setAttribute("class", styles.letters_title_letter)
            letterP.style.top = Math.round(windowWidth * Math.random()) + "px"
            letterP.style.left = Math.round(windowWidth * Math.random()) + "px"
            lettersMain.current.appendChild(letterP);
            let { x, y } = { ...lettersPlacement };
            animate(letterP,
                {
                    top: y + "px",
                    left: x + Number(order) * spacing + "px"
                },
                { duration: 1 })
        })
        window.addEventListener("resize", () => {
            const windowWidth = window.innerWidth;
            const placement = getPlacement(windowWidth);
            setLettersPlacement((currentPlacement: Point) => {
                if (currentPlacement === placement) {
                    return currentPlacement;
                }
                lettersInitialized.current = false;
                lettersMain.current.innerHTML = "";
                return placement;
            });
            const letterSpacing = getSpacing(windowWidth);
            setSpacing((currentSpacing: number) => {
                if (currentSpacing === letterSpacing) {
                    return currentSpacing;
                }
                lettersInitialized.current = false;
                lettersMain.current.innerHTML = "";
                return letterSpacing;
            });
        })
    }, [lettersPlacement, spacing, setLettersPlacement, setSpacing])

    return (
        <div
            ref={lettersMain}
            className={styles.letters_title} />
    )
}

export default LettersAnimation;